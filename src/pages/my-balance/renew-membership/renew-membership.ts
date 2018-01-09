import { AppUtilFunctions } from './../../../app/appglobal/app.utilfuns';
// Main Components
import {Component} from '@angular/core';
import {Events, IonicPage, ModalController, NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
//import { DateFormatPipe } from 'angular2-moment';
// Providers
import {TranslateService} from 'ng2-translate';
import { UserProvider } from './../../../providers/user/user';

@IonicPage()
@Component({
    selector: 'page-renew-membership',
    templateUrl: 'renew-membership.html',
})
export class RenewMembership {
    showLoader: boolean = true;
    pageParams: any;
    userServices: any;
    totalSelectCost:any;
    totalCostAfdisc:any;
    subscriptionPeriod:number = 1;
    cost:any;
    alertTitle:string;
    alertSubTitle:string;
    alertAccept:string;
    actionLoader: boolean = false;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalctrl: ModalController,
        public events: Events,
        public viewCtrl: ViewController,
        public userProvider: UserProvider,
        public translateService: TranslateService,
        public appUtils: AppUtilFunctions,
        public alertCtrl: AlertController
    ) {
         console.log('*************** RenewMembership ******************');
        this.pageParams = this.navParams.get('pageData');
        console.log('pageParams >>> ', this.pageParams);
        
    }

    ionViewDidEnter() {
        // Run After Page Already Entered

    }

    ionViewDidLoad() {
        this.getUserServices(this.pageParams.id);
    }
        

    getUserServices(id){
     this.userProvider.getUserServices({"user_id": id,"lang_code":this.appUtils.CurrentLang}).subscribe((data) => {
        if (data) {
            console.log('service to renew From server', data);
            this.userServices = data;
            if (data.services.length > 1) {
                this.userServices['servicesCount'] = data.services.length;
            }
            this.calculatSubscription();
            
            
        }
        
     }, err => {
        if (err.error instanceof Error) {
            console.warn('client side errror', err)
        } else {
            console.warn('server side error', err)
        }
     }, () => {
        this.showLoader = false;
     })
    }

    calculatSubscription(){
        this.totalSelectCost = (this.subscriptionPeriod * this.userServices.total_cost);
        if (this.userServices.services.length > 1) {
            this.totalCostAfdisc = ((this.subscriptionPeriod * this.userServices.total_cost) - ((this.subscriptionPeriod * this.userServices.total_cost * 30 ) / 100 ));
        }
        
        console.log(this.subscriptionPeriod , this.totalSelectCost, this.totalCostAfdisc);
        
    }

    addSubscription(){
        
        if(!this.subscriptionPeriod){
            this.translateService.get('plz_select_period')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else{
            console.log('this totalSelectCost', this.totalSelectCost);
            console.log('this totalCostAfdisc', this.totalCostAfdisc);
            
            this.totalCostAfdisc ? this.cost = this.totalCostAfdisc :  this.cost = this.totalSelectCost;
            console.log('this cost', this.cost);
            if (this.cost <= this.pageParams.balanceSum) {
                this.actionLoader = true;
                if (this.pageParams.lastEndDate) {
                    console.log('pageParams >>> ', this.pageParams);
                }
                let start_date ;
                this.pageParams.lastEndDate ? start_date  = this.pageParams.lastEndDate : start_date = "no_start_date";
                let subscrData = {
                    "user_id": this.pageParams.id,
                    "balance": -this.cost,
                    "type": '4',
                    "start_date":start_date,
                    "period":this.subscriptionPeriod
                }
                this.userProvider.addSubscription(subscrData).subscribe((data) => {
                    if (data) {
                        console.log('addSubscription From server', data);
                        this.dismiss(data);
                    }

                    
                }, err => {
                    if (err.error instanceof Error) {
                        console.warn('client side errror', err)
                    } else {
                        console.warn('server side error', err)
                    }
                }, () => {
                    this.actionLoader = false;
                })

            }else{
                this.notEnoughtAlert();
            }
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


    dismiss(data) {
        this.viewCtrl.dismiss(data);
    }

}
