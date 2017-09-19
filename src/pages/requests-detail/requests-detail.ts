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
    

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public translate: TranslateService,
        public actionSheetCtrl: ActionSheetController,
        public modalCtrl: ModalController,
        private toastCtrl: ToastController
    ) {
        this.myRequests = "mine";
    }

    ionViewDidEnter() {
        // Run After Page Already Entered
    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
        this.translate.get('User-was-choosed')
            .subscribe(lang => {
                this.toasttext = lang;
            })
        this.translate.get('Close')
            .subscribe(lang => {
                this.closetext = lang;
            })

    }
    goProfilePage() {
        this.navCtrl.push(ProfilePage);
    }
    presentToast() {
        let toast = this.toastCtrl.create({
            message: this.toasttext,
            duration: 33000,
            showCloseButton: true,
            closeButtonText: this.closetext,
            position: 'middle'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

    applyjop() {
        let applyjopModal = this.modalCtrl.create(ApplyJop);
        applyjopModal.present();
        applyjopModal.onDidDismiss(data => {
            console.log(data);
        });
    }

    locationmodal() {
        let getlocationModal = this.modalCtrl.create(GetLocation);
        getlocationModal.present();
        getlocationModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })
    }
    MessagesDetail() {
        let MessagesDetailModal = this.modalCtrl.create(MessagesDetail);
        MessagesDetailModal.present();
        MessagesDetailModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })

    }

}
