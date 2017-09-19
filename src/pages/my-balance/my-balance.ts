// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams, Events} from 'ionic-angular';

// Providers

// Req Pages
import { BalanceHistory } from '../balance-history/balance-history';


@IonicPage()
@Component({
    selector: 'page-my-balance',
    templateUrl: 'my-balance.html',
})
export class MyBalance {

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
        BalanceHistorymodal() {
        let BalanceHistoryModal = this.modalctrl.create(BalanceHistory);
        BalanceHistoryModal.present();
        BalanceHistoryModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })

    }



}
