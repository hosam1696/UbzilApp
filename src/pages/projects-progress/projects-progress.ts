// Main Components
import {Component} from '@angular/core';
import {ActionSheetController, Events, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';

// Providers



@IonicPage()
@Component({
    selector: 'page-projects-progress',
    templateUrl: 'projects-progress.html',
})
export class ProjectsProgress {

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
    goRequestsDetail() {
        this.navCtrl.push('RequestsDetail');
    }
    addreviewmodal() {
        let addreviewmodal = this.modalCtrl.create('AddReview');
        addreviewmodal.present();
        addreviewmodal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })
    }
    goProfilePage() {
        this.navCtrl.push('ProfilePage');
    }


}
