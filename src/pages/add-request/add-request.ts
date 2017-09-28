import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
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
  MreqAddress: string = '| | |';
  localUser: any;
  DataFromModal: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
     public appUtils:AppUtilFunctions,
     public events: Events,
    public services: ServicesProvider
  ) {    

    this.pageParams = this.navParams.get('pageData');

    console.log('params data from sub category page', this.pageParams)
  }

  async ionViewWillEnter(){

    this.localUser = await this.appUtils.getUserInfo();

    console.log('awaited user Info', this.localUser)

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
      let getlocationModal = this.modalCtrl.create('GetLocation', { pageData: { lat: '30.4446546', lng: '20.484897', service_id: this.pageParams.id, skipSearch: true  }});
        getlocationModal.present();
        getlocationModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })
    }


  
    openModal() {
      let modal = this.modalCtrl.create('PlacesModalPage');

      modal.onDidDismiss(data => {
        console.log('data from modal', data);
        this.DataFromModal = data;
        this.MreqAddress = data.governorate + (data.city ? ' - ' + data.city  + (data.district ? ' - ' + data.district:''): '');
      });

      modal.present()
    }
  
  
  
     sendRequest() {
    

       let requesrDetails = {
         service_id: this.pageParams.id,
         request_title: 'service title',
         longitude: this.localUser.longitude,
         latitude: this.localUser.latitude,
         country_id: this.DataFromModal.country_id,
         city_id: this.DataFromModal.city_id,
         district_id: this.DataFromModal.district_id,
         user_id: this.localUser.id,
         form: [
           {
             formshape_id: 46,
             value: 'fsdf'
           }
         ]
       };


       console.log('almost request data', requesrDetails)
    }
  
}
