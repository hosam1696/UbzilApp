import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
// Main Components
import {Component} from '@angular/core';
import {Events, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
// Providers
import {TranslateService} from 'ng2-translate';
import { UserProvider } from './../../providers/user/user';

@IonicPage()
@Component({
    selector: 'page-my-balance',
    templateUrl: 'my-balance.html',
})
export class MyBalance {
    userBalances:any;
    userLocal:any;
    showLoader: boolean = true;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalctrl: ModalController,
        public events: Events,
        public appUtils: AppUtilFunctions,
        public userProvider: UserProvider,
        public translateService: TranslateService,


    ) {
        console.log('*************** MyBalance ******************');
    }

    ionViewDidEnter() {
        // Run After Page Already Entered

    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
        this.appUtils.storage.get('localUserInfo')
        .then((data)=>{
        this.userLocal = data;
        console.log('localUserInfo in MyBalance',this.userLocal);
            this.getUserBalances(this.userLocal.id,this.userLocal.service_type);
        })

    }
    // TODO: Get User Balances
    getUserBalances(id,service_type){
    this.userProvider.getUserBalances({"user_id": id,"service_type":service_type}).subscribe((data) => {
        if (data) {
            console.log('user balances From server', data);
            this.userBalances = data;
        }
        
    }, err => {
        //this.loader = false;
        if (err.error instanceof Error) {
            console.warn('client side errror', err)
        } else {
            console.warn('server side error', err)
        }
    }, () => {
        this.showLoader = false;
    })
    }
    BalanceHistorymodal() {
        let BalanceHistoryModal = this.modalctrl.create('BalanceHistory',{pageData:{"id":this.userLocal.id}});
        BalanceHistoryModal.present();
        BalanceHistoryModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })

    }



}
