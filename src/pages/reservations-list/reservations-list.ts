// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams, Events, ActionSheetController, ToastController} from 'ionic-angular';
import {TranslateService} from 'ng2-translate';

// Providers

// Req Pages
import {ProfilePage} from '../profile/profile';
import {ConfirmReservation} from '../confirm-reservation/confirm-reservation';



@IonicPage()
@Component({
    selector: 'page-reservations-list',
    templateUrl: 'reservations-list.html',
})
export class ReservationsList {
    x = "true";
    closetext: any;
    toasttext: any;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public actionSheetCtrl: ActionSheetController,
        public modalCtrl: ModalController,
        public translate: TranslateService,
        private toastCtrl: ToastController,
    ) {
        this.x = "true";
    }

    ionViewDidEnter() {
        // Run After Page Already Entered
    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
        this.translate.get('reservations-accepted')
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

    ConfirmReservationmodal() {
        let ConfirmReservationModal = this.modalCtrl.create(ConfirmReservation);
        ConfirmReservationModal.present();
        ConfirmReservationModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })
    }
    accepted() {
        let toast = this.toastCtrl.create({
            message: this.toasttext,
            position: "middle",
            showCloseButton: true,
            closeButtonText: this.closetext,
            duration: 3000
        });
        toast.present();
    }

}
