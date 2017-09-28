import { ServicesProvider } from './../../providers/services/services';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';

import {GetLocation} from "../get-location/get-location";


@IonicPage()
@Component({
  selector: 'page-add-request',
  templateUrl: 'add-request.html',
})
export class AddRequest {
  pageParams: any;
  newFormDs: any = {};
  MreqAddress: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
     public modalCtrl: ModalController,
     public events: Events,
    public services: ServicesProvider
  ) {    

    this.pageParams = this.navParams.get('pageData');

    console.log('params data from sub category page', this.pageParams)
  }

  ionViewDidEnter(){
    // Run After Page Already Entered
  }

  ionViewDidLoad() {
    // Run After Page Already Loaded

    this.services.getServiceFormShape(
      {
        "user_id": "3",
        "verifycode": "$2y$12$XQBdOjshGvoSRcT6uTlJaOkOiV.htMTyyT09IXxdjHrSQeoc/vgkO", "lang_code": this.pageParams.lang_code,
        "service_id": this.pageParams.id,
      }
    ).subscribe(({status, data, error}) => {
      if (status === 'success') {
        let groupByType = type => data.forms.filter(x => x.type == type);
        let currentFormInputs = ['select', 'input', 'textarea', 'checkbox', 'file'];

        console.log(data.forms);

        
        for (let input of currentFormInputs) {
          if (groupByType(input).length > 0)
            this.newFormDs[input] = groupByType(input)
        }

        console.log('new Form Data structure', this.newFormDs);
        
      } else {
        console.warn(error)
        }
    })
  }

    locationmodal() {
      let getlocationModal = this.modalCtrl.create('GetLocation', { pageData: { lat: '30.4446546', lng: '20.484897', service_id: this.pageParams.id } });
        getlocationModal.present();
        getlocationModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })
    }


  
    openModal() {
      let modal = this.modalCtrl.create('PlacesModalPage');

      modal.onDidDismiss(data => {
        console.log('data from modal', data);
        this.MreqAddress = data.country + ' - ' + (data.governorate ? data.governorate +' - '+(data.district?data.district:''): '');
      });

      modal.present()
    }
}
