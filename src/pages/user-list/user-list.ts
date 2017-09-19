// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams, Events, ActionSheetController, PopoverController} from 'ionic-angular';

// Providers

// Req Pages
import { AddReview } from '../addreview/addreview';
import {ProfilePage} from '../profile/profile';
import {PopoverContentPage} from '../popover/popover';
import {MessagesDetail} from '../messages-detail/messages-detail';


@IonicPage()
@Component({
    selector: 'page-user-list',
    templateUrl: 'user-list.html',
})
export class UserList {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public actionSheetCtrl: ActionSheetController,
        public modalCtrl: ModalController,
        public popoverCtrl: PopoverController,
    ) {
    }

    ionViewDidEnter() {
        // Run After Page Already Entered
    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
    }
    goProfilePage(){
        this.navCtrl.push(ProfilePage);
    }
      addreviewmodal() {
        let addreviewmodal = this.modalCtrl.create(AddReview);
        addreviewmodal.present();
        addreviewmodal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })
    }
        MessagesDetail() {
        let MessagesDetailModal = this.modalCtrl.create(MessagesDetail);
        MessagesDetailModal.present();
        MessagesDetailModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })

    }
        openPopover(myEvent) {
        let popover = this.popoverCtrl.create(PopoverContentPage);
        popover.present({
            ev: myEvent
        });
    }



}
