import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, ViewController, NavParams, Events, ActionSheetController, ToastController} from 'ionic-angular';
import {TranslateService} from 'ng2-translate';
import { Console } from '@angular/core/src/console';

// Req Pages
import { UserProvider } from './../../providers/user/user';

@IonicPage()
@Component({
    selector: 'page-work-time',
    templateUrl: 'work-time.html',
})
export class WorkTime {
    days: any[];
    public x: number;
    public y: number;
    isDone: boolean = false;
    
    closetext:any;
    toasttext:any;
    workTimeType:number;
    pageParams:any;
    userLocal:any;
    showAllworkTimeType:boolean;
    
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public events: Events,
        public translateService: TranslateService,
        private toastCtrl: ToastController,
        public actionSheetCtrl: ActionSheetController,
        public modalCtrl: ModalController,
        public appUtils: AppUtilFunctions,
        public userProvider: UserProvider,
    ) {
        console.log('*************** WorkTime ******************');
        //this.pageParams = this.navParams.get('pageData');
        //console.log('pageParams >>> ', this.pageParams);
        
        this.days = [
            {"id": 0, "work_day": "Saturday", "checked": false, "timeTable": [{"from": this.x, "to": this.y}]},
            {"id": 1, "work_day": "Sunday", "checked": false, "timeTable": [{"from": this.x, "to": this.y}]},
            {"id": 2, "work_day": "Monday", "checked": false, "timeTable": [{"from": this.x, "to": this.y}]},
            {"id": 3, "work_day": "Tuesday", "checked": false, "timeTable": [{"from": this.x, "to": this.y}]},
            {"id": 4, "work_day": "Wednesday", "checked": false, "timeTable": [{"from": this.x, "to": this.y}]},
            {"id": 5, "work_day": "Thursday", "checked": false, "timeTable": [{"from": this.x, "to": this.y}]},
            {"id": 6, "work_day": "Friday", "checked": false, "timeTable": [{"from": this.x, "to": this.y}]},
        ];
        console.log('constructor days',this.days);
    }

    ionViewDidEnter() {
        // Run After Page Already Entered
        console.log('ionViewDidEnter');
        

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad');
        // Run After Page Already Loaded
        this.translateService.get('Changes-saved')
            .subscribe(lang => {
                this.toasttext = lang;
            })
        this.translateService.get('Close')
            .subscribe(lang => {
                this.closetext = lang;
            })

        this.appUtils.storage.get('localUserInfo')
        .then((data)=>{
            this.userLocal = data;
            console.log('localUserInfo in WorkTime',this.userLocal);
            this.getUserWorkTimeToEdit();
        })
    }

    getUserWorkTimeToEdit(){
        this.userProvider.getUserWorkTimeToEdit({"user_id": this.userLocal.id}).subscribe((data) => {
            if (data) {
                console.log('user work times From server', data);
               if (data.user_work_type == 4) {
                    this.showAllworkTimeType = false;
                    this.workTimeType  = 4;

                    for (let i = 0;i < data.work_days.length;i++) {
                        console.log('here');
                        for (let j = 0; j < this.days.length; j++) {
                            if(data.work_days[i].work_day == this.days[j]['work_day']){
                                this.days[j]['checked'] = true;
                                this.days[j]['timeTable'] = data.work_days[i].timeTable;
                            }
                        }                        
                    }
                    console.log('edit days',this.days);
                }else{ 
                    this.showAllworkTimeType = true;
                    this.workTimeType  = data.user_work_type;
                }
                 
            }else{
                console.log('here');
                
                if (this.userLocal.service_type == '3') {
                    this.showAllworkTimeType = true;
                    this.workTimeType  = 1;
                }else{ 
                    // else == 2 mean that has costums times as clincs and labs
                    this.showAllworkTimeType = false;
                    this.workTimeType  = 4;
                }
            }
            
        }, err => {
            //this.loader = false;
            if (err.error instanceof Error) {
                console.warn('client side errror', err)
            } else {
                console.warn('server side error', err)
            }
        }, () => {
        })
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
    
    radioChecked(){
        console.log('workTimeType is ', this.workTimeType);

    }
    dayCheck(day) {
        console.log("this day is " + day.work_day);
    }
    

    detectCheck(val, day) {
        day.checked = val;
        console.log('detectCheck',val, day);
    }

    addmore(day) {
        console.log("add more button" , day.timeTable);
        var p = {"from": this.x, "to": this.y};
        day.timeTable.push(p);
    }
    
    remove(i, timeTable) {
        let dayIndex = this.days.findIndex(day => day.timeTable == timeTable);
        console.log(i, timeTable);
        console.log('Index of the day we work on', dayIndex);
        this.days[dayIndex].timeTable.splice(i, 1);
    }

    SaveChanges() {
        console.log('this days in saveChanges', this.days);

        let sentData ={
            "user_id": this.userLocal.id,
            "verifycode": this.userLocal.verifycode,
            "user_work_type": this.workTimeType,
            "work_days":this.days
        };
        console.log('last step all data to server from workTime', sentData)
        this.userProvider
        .addUserWorkTimes(sentData)
        .subscribe(({ data, errors })=> {
                if (data) {
                    delete data.user_id;
                    delete data.verifycode;
                    /*delete sentData.service_cost;
                    let applicantData = {
                        ... sentData,
                        "date_added":Date.now(),
                        "fullname":this.userLocal.fullname,
                        "avatar":this.userLocal.avatar,
                        "gender":this.userLocal.gender,
                        "rater_count":this.userLocal.rater_count,
                        "rating_value":this.userLocal.rating_value,
                    } */
                    this.viewCtrl.dismiss(data);
                    let toast = this.toastCtrl.create({
                        message: this.toasttext,
                        position: "middle",
                        showCloseButton: true,
                        closeButtonText: this.closetext,
                        duration: 3000
                    });
                    toast.present();
                }else{
                    this.translateService.get(errors)
                        .subscribe( value => {this.appUtils.AppToast(value)})
                }
            },
            err => {
            if (err.error instanceof Error) {
                console.warn('client side error', err)
            } else {
                console.warn('server side error', err);
                }
            },
            () => {
            }
        
        );
    }
}