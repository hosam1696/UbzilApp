// Main Components
import {Component} from '@angular/core';
import {ActionSheetController, Events, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';

// Providers



@IonicPage()
@Component({
    selector: 'page-excuted-requests',
    templateUrl: 'excuted-requests.html',
})
export class ExcutedRequests {

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
        goProfilePage(){
        this.navCtrl.push('ProfilePage');
    }
    goRequestsDetail(){
        this.navCtrl.push('RequestsDetail');
    }
      addreviewmodal() {
        let addreviewmodal = this.modalCtrl.create('AddReview');
        addreviewmodal.present();
        addreviewmodal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })
    }



}
