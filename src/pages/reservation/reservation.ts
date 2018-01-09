import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';

//import { Push } from '@ionic-native/push';
// Main Components
import {Component} from '@angular/core';
import {IonicPage, ViewController, NavParams, ToastController} from 'ionic-angular';
import {TranslateService} from 'ng2-translate';

// Providers
import { UserProvider } from './../../providers/user/user';

// Req Pages


@IonicPage()
@Component({
    selector: 'page-reservation',
    templateUrl: 'reservation.html',
})
export class Reservation {
    closetext:any;
    toasttext:any;
    pageParams:any;
    userLocal:any;
    fourDates:any = [];
    dayOfWeek:number;
    bookingName:any;
    bookingMobile:any;
    bookingDate:any = 1;
    bookingMessage:any;
    showLoader: boolean = true;
    addLoader: boolean = false;
    

    constructor(
        //public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public translateService: TranslateService,
        //public events: Events,
        //public actionSheetCtrl: ActionSheetController,
        //public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        public appUtils: AppUtilFunctions,
        public userProvider: UserProvider,
    ) {
        console.log('*************** Reservation ******************');
        this.pageParams = this.navParams.get('pageData');
        console.log('pageParams >>> ', this.pageParams);
    }

    ionViewDidEnter() {
        // Run After Page Already Entered

    }

    ionViewDidLoad() {
        // Run After Page Already Loaded

        this.translateService.get('book-date')
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
            this.bookingName = this.userLocal.fullname;
            this.bookingMobile = this.userLocal.mobile;
            this.showLoader = false;
            console.log('localUserInfo in Reservation',this.userLocal);
            this.getNextFourDates(this.pageParams.day);
        })
    }
    getNextFourDates(workDay) {
        switch(workDay) { 
            case "Monday": { 
                this.dayOfWeek = 1 
               break; 
            } 
            case "Tuesday": { 
                this.dayOfWeek = 2 
               break; 
            } 
            case "Wednesday": { 
                this.dayOfWeek = 3 
               break; 
            }
            case "Thursday": { 
                this.dayOfWeek = 4 
               break; 
            }
            case "Friday": { 
                this.dayOfWeek = 5 
               break; 
            }
            case "Saturday": { 
                this.dayOfWeek = 6 
               break; 
            }
            case "Sunday": { 
                this.dayOfWeek = 7 
               break; 
            } 
            default: { 
               console.log("Invalid day"); 
               break;              
            } 
        }

        let today = new Date();
        console.log(today);

        let firstDate = new Date(today.getTime());
        firstDate.setDate(today.getDate() + (7 + this.dayOfWeek - today.getDay()) % 7);

        let secondDate = new Date(firstDate.getTime());
        secondDate.setDate(firstDate.getDate()+7);

        let thirdDate = new Date(secondDate.getTime());
        thirdDate.setDate(secondDate.getDate()+7);

        let fourthDate = new Date(thirdDate.getTime());
        fourthDate.setDate(thirdDate.getDate()+7);

        this.fourDates[0] = firstDate;
        this.fourDates[1] = secondDate;
        this.fourDates[2] = thirdDate;
        this.fourDates[3] = fourthDate;
        // this.bookDate = 2017-12-30;
        
                
        //this.fourDates.push(resultDate);
        console.log(this.fourDates);
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
    
    BookDate() {
        //console.log(this.pageParams.fullname, this.pageParams.mobile, this.pageParams.day,this.book_date,this.book_message);
        if(!this.bookingName){
            this.translateService.get('plz-enter-fullname')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else if(isNaN(this.bookingMobile) || !this.bookingMobile){
            this.translateService.get('plz-true-number')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else if(this.bookingDate == 1){
            this.translateService.get('plz_select_booking_date')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else{
            this.addLoader = true;
            let sentData ={
                "user_id": this.userLocal.id,
                "provider_id": this.pageParams.provider_id,
                //"verifycode": this.userLocal.verifycode,
                "mobile": this.bookingMobile,
                "fullname": this.bookingName,
                "booking_day":this.pageParams.day,
                "booking_date":this.bookingDate,
                "booking_message":this.bookingMessage,
            };
            console.log('data to server from Reservation', sentData);        
            this.userProvider
            .addUserBooking(sentData)
            .subscribe((data)=> {
                    if (data) {
                        this.addLoader = false;
                        this.viewCtrl.dismiss(data);
                        let toast = this.toastCtrl.create({
                            message: this.toasttext,
                            position: "middle",
                            showCloseButton: true,
                            closeButtonText: this.closetext,
                            duration: 3000
                        });
                        toast.present();
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


}

