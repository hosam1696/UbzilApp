// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams, Events, ViewController} from 'ionic-angular';

// Providers

// Req Pages
import {MessagesDetail} from '../messages-detail/messages-detail';


@IonicPage()
@Component({
    selector: 'page-balance-history',
    templateUrl: 'balance-history.html',
})
export class BalanceHistory {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalctrl: ModalController,
        public events: Events,
        public viewCtrl: ViewController,
    ) {
    }

    ionViewDidEnter() {
        // Run After Page Already Entered

    }

    ionViewDidLoad() {
        // Run After Page Already Loaded

    }
        MessagesDetail() {
        let MessagesDetailModal = this.modalctrl.create(MessagesDetail);
        MessagesDetailModal.present();
        MessagesDetailModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })

    }

   dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

}
