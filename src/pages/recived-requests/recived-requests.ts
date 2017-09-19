// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams, Events, ActionSheetController} from 'ionic-angular';

// Providers

// Req Pages
import { RequestsDetail } from '../requests-detail/requests-detail';
import { AddReview } from '../addreview/addreview';
import {ProfilePage} from '../profile/profile';


@IonicPage()
@Component({
    selector: 'page-recived-requests',
    templateUrl: 'recived-requests.html',
})
export class RecivedRequests {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public actionSheetCtrl: ActionSheetController,
        public modalCtrl: ModalController

    ) {
    }

    ionViewDidEnter() {
        // Run After Page Already Entered
    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
    }
    goRequestsDetail(){
        this.navCtrl.push(RequestsDetail);
    }
      addreviewmodal() {
        let addreviewmodal = this.modalCtrl.create(AddReview);
        addreviewmodal.present();
        addreviewmodal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })
    }

    goProfilePage(){
        this.navCtrl.push(ProfilePage);
    }

}
