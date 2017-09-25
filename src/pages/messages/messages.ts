// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams, Events} from 'ionic-angular';

// Providers

// Req Pages
import {MessagesDetail} from '../messages-detail/messages-detail';


@IonicPage()
@Component({
    selector: 'page-messages',
    templateUrl: 'messages.html',
})
export class Messages {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalctrl: ModalController,
        public events: Events,
 
    ) {
    }

    ionViewDidEnter() {
        // Run After Page Already Entered

    }

    ionViewDidLoad() {
        // Run After Page Already Loaded

    }
        MessagesDetail() {
        let MessagesDetailModal = this.modalctrl.create('MessagesDetail');
        MessagesDetailModal.present();
        MessagesDetailModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })

    }



}
