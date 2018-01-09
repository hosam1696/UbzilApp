import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ViewController, NavParams, ToastController, Events, AlertController} from 'ionic-angular';
import {TranslateService} from 'ng2-translate';

// Providers
import { ProjectsProvider} from './../../providers/projects/project';
import { UserProvider } from './../../providers/user/user';
// Req Pages

@IonicPage()
@Component({
    selector: 'page-applyjop',
    templateUrl: 'applyjop.html',
})
export class ApplyJop {

    pageParams: any;
    mestitle: any;
    mesbody: any;
    toasttext: any;
    closetext: any;
    typeOfferDuration: any = 'constant';
    offerPrice: any;
    offerDuration: any;
    offerDetails: any;
    userLocal:any;
    userBalances:any
    alertTitle:string;
    alertSubTitle:string;
    alertAccept:string;
    //showLoader: boolean = true;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public events: Events,
        public translateService: TranslateService,
        private toastCtrl: ToastController,
        public appUtils: AppUtilFunctions,
        public projectsProvider: ProjectsProvider,
        public userProvider: UserProvider,
        public alertCtrl: AlertController
    ) {
        console.log('*************** ApplyJop ******************');
        this.pageParams = this.navParams.get('pageData');
        console.log('pageParams >>> ', this.pageParams);

    }

    ionViewDidEnter() {
    }

    ionViewDidLoad() {
        this.translateService.get('Request-successfully')
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
            console.log('localUserInfo in ApplyJop', this.userLocal);
            this.getUserBalances(this.userLocal.id,this.userLocal.service_type);
        })
    }

    // TODO: Get User Balances
    getUserBalances(id,service_type){
        this.userProvider.getUserBalances({"user_id": id,"service_type":service_type}).subscribe((data) => {
            if (data) {
                // todo: i use the unary + operator to convert string to intger
                this.userBalances = +data.balanceSum;
                console.log('user ddddd', this.userBalances);
            }
            
        }, err => {
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

    Send() {
        console.log('userBalance', this.userBalances);
        console.log('serviceCost', +this.pageParams.serviceCost);
        if(!this.offerPrice){
            this.translateService.get('plz_insert_offer_price')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else if(!this.offerDuration){
            this.translateService.get('plz_insert_offer_duration')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else if(this.userBalances < +this.pageParams.serviceCost){
            this.notEnoughtAlert();
        }else{

            let sentData ={
                "provider_id": this.userLocal.id,
                "order_id":this.pageParams.orderId,
                "offer_price": this.offerPrice,
                "type_offer_duration":this.typeOfferDuration,
                "offer_duration":this.offerDuration,
                "offer_details":this.offerDetails,
                "user_id": this.userLocal.id,
                "verifycode": this.userLocal.verifycode,
                //"lang_code": this.appUtils.CurrentLang,
                "service_cost":this.pageParams.serviceCost,
            };
            this.projectsProvider.addOffer(sentData).subscribe((data) => {
                console.log('applicants from server in ApplyJop', data);
                if (data) {
                    //this.dismiss(this.pageParams.orderId);
                    delete sentData.user_id;
                    delete sentData.verifycode;
                    delete sentData.service_cost;
                    let applicantData = {
                        ... sentData,
                        "date_added":Date.now(),
                        "fullname":this.userLocal.fullname,
                        "avatar":this.userLocal.avatar,
                        "gender":this.userLocal.gender,
                        "rater_count":this.userLocal.rater_count,
                        "rating_value":this.userLocal.rating_value,
                    }
                    this.viewCtrl.dismiss(applicantData);
                    let toast = this.toastCtrl.create({
                        message: this.toasttext,
                        position: "middle",
                        showCloseButton: true,
                        closeButtonText: this.closetext,
                        duration: 3000
            
                    });
                    toast.present();
                } else {
                    console.warn('somthing went wrong when getting Project Details')
                }
            }, err => {
                //this.showLoader = false;
                if (err.error instanceof Error) {
                    console.warn('client side error', err);
                } else {
                    console.warn('server side error', err);
                }
            }, () => {
                //this.showLoader = false;
            })
        }
    }
    
    notEnoughtAlert(){
        
        this.translateService.get('warning')
        .subscribe(value => {this.alertTitle = value});

        this.translateService.get('not_enough_balance')
        .subscribe(value => {this.alertSubTitle = value});

        this.translateService.get('Close')
        .subscribe(value => {this.alertAccept = value});

        let alert = this.alertCtrl.create({
            title: this.alertTitle,
            subTitle: this.alertSubTitle,
            buttons:[
                {
                    text: this.alertAccept,
                    handler: () => {
                        console.log("accepted Clicked");
                    }
                }
            ]
        });
        alert.present();
    }


}
