import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';

import {GetLocation} from "../get-location/get-location";


@IonicPage()
@Component({
  selector: 'page-add-request',
  templateUrl: 'add-request.html',
})
export class AddRequest {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
     public modalCtrl: ModalController,
    public events: Events
  ) {    
  }

  ionViewDidEnter(){
    // Run After Page Already Entered
  }

  ionViewDidLoad() {
    // Run After Page Already Loaded
  }

    locationmodal() {
        let getlocationModal = this.modalCtrl.create(GetLocation);
        getlocationModal.present();
        getlocationModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })
    }


}
