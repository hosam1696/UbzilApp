// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams, Events, ViewController} from 'ionic-angular';

// Providers

// Req Pages


@IonicPage()
@Component({
    selector: 'notifications-detail',
    templateUrl: 'notifications-detail.html',
})
export class NotificationsDetail{

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public viewCtrl: ViewController
    ) {
    }

    ionViewDidEnter() {
        // Run After Page Already Entered

    }

    ionViewDidLoad() {
        // Run After Page Already Loaded

    }




}
