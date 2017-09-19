// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Events, ModalController} from 'ionic-angular';

// Providers

// Req Pages
import {NotificationsDetail} from "../notifications-detail/notifications-detail";
@IonicPage()
@Component({
    selector: 'page-notifications',
    templateUrl: 'notifications.html',
})
export class Notifications {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        public events: Events
    ) {
    }

    ionViewDidEnter() {
        // Run After Page Already Entered
    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
    }

NotificationsDetail(){
    this.navCtrl.push(NotificationsDetail);
}

}
