import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams, Events, ActionSheetController, ToastController} from 'ionic-angular';
import {TranslateService} from 'ng2-translate';

// Providers


// Req Pages
import {ApplyJop} from "../applyjop/applyjop";
import {GetLocation} from "../get-location/get-location";
import {MessagesDetail} from '../messages-detail/messages-detail';
import {ProfilePage} from '../profile/profile';


@IonicPage()
@Component({
    selector: 'page-requests-detail',
    templateUrl: 'requests-detail.html',
})
export class RequestsDetail {
    myRequests: any;
    closetext:any;
    toasttext:any;
    isRTL: boolean;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public modalCtrl: ModalController,
        public appUtils: AppUtilFunctions
    ) {
        this.myRequests = "mine";
    }

    ionViewDidEnter() {
        // Run After Page Already Entered
        this.isRTL = this.appUtils.isRTL
    }

    ionViewDidLoad() {
        // Run After Page Already Loade

    }
   

    navigateTo(page: string, isModal: boolean = false, pageData?: any): void {
        if (isModal) {
            let EditProfileModal = this.modalCtrl.create(page, { pageData });
            EditProfileModal.present();
            EditProfileModal.onDidDismiss(dismissData => {
                // Saving this info to local storage after updating user profile info

                if (page === 'EditProfile') {
                    // Do some interesting stuff here

                } else if (page === 'Contactus') {
                    // Do some interesting stuff here

                }

            })
        } else {
            this.navCtrl.push(page)
        }
    }
}
