// Main Components
import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController} from 'ionic-angular';
// Providers
// Req Pages
import {AppUtilFunctions} from "../../app/appglobal/app.utilfuns";



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
        public modalCtrl: ModalController,
        public appUtils: AppUtilFunctions
    ) {
        this.x = "true";
    }

    ionViewDidEnter() {
        // Run After Page Already Entered
    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
        this.appUtils.translate.get('reservations-accepted')
            .subscribe(lang => {
                this.toasttext = lang;
            })
        this.appUtils.translate.get('Close')
            .subscribe(lang => {
                this.closetext = lang;
            })
    }

    goProfilePage() {
        this.navCtrl.push('ProfilePage');
    }

    reservationMsgmodal() {
        let ConfirmReservationModal = this.modalCtrl.create('ConfirmReservation');
        ConfirmReservationModal.present();
        ConfirmReservationModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })
    }
    accepted() {

      this.appUtils.AppToast(this.toasttext,
        {position: "middle",
        showCloseButton: true,
        closeButtonText: this.closetext,
        duration: 3000});
    }


  sendReservationStatus(accept:boolean= false):void {
      accept?this.accepted():this.reservationMsgmodal()
  }

}
