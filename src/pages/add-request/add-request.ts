import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
import { ServicesProvider } from './../../providers/services/services';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';

import {GetLocation} from "../get-location/get-location";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ILocalUser } from '../../app/appglobal/app.interfaces';


@IonicPage()
@Component({
  selector: 'page-add-request',
  templateUrl: 'add-request.html',
})
export class AddRequest {
  pageParams: any;
  newFormDs: any = {};
  MreqAddress: string = 'لم يتم التحديد';
  DataFromModal: any = {};
  RequestForm: FormGroup;
  localUser: ILocalUser;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
     public appUtils:AppUtilFunctions,
     public events: Events,
    public services: ServicesProvider,
    formBuilder: FormBuilder
  ) {    

    this.pageParams = this.navParams.get('pageData');

    console.log('params data from sub category page', this.pageParams);
    
    this.RequestForm = formBuilder.group({
      title: ['', Validators.required],
      address: ['', Validators.required],
      location: [''],
      forms: formBuilder.group({})
    });

  }

  ionViewWillEnter(){

    
    
  }
  
  async ionViewDidLoad() {
    // Run After Page Already Loaded
    
    this.localUser = await this.appUtils.getUserInfo();
    
    this.services.getServiceFormShape(
      {
        "user_id":  3 ,
        "verifycode": this.localUser.verifycode || "$2y$12$XQBdOjshGvoSRcT6uTlJaOkOiV.htMTyyT09IXxdjHrSQeoc/vgkO", "lang_code": this.pageParams.lang_code,
        "service_id": this.pageParams.id,
      }
    ).subscribe(({status, data, error}) => {
      if (status === 'success') {
        let groupByType = type => data.forms.filter(x => x.type == type);
        let currentFormInputs = ['select', 'input', 'textarea', 'checkbox', 'file'];

        console.log(data.forms);

        
        for (let input of currentFormInputs) {
          if (groupByType(input).length > 0) {
            this.newFormDs[input] = groupByType(input)
            this.newFormDs[input].forEach(inputControl => {
              
              let forms = this.RequestForm.get('forms') as FormGroup;

              forms.addControl(inputControl.id,new FormControl('', Validators.required))

            });
          }
        }

        console.log('new Form Data structure', this.newFormDs);
        
      } else {
        console.warn(error)
        }
    });


    // For Development Only 

    this.sendRequest();

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
        this.RequestForm.get('address').setValue(data.governorate + (data.city ? ' - ' + data.city  + (data.district ? ' - ' + data.district:''): ''));
      });

      modal.present()
    }
  
  
  
     sendRequest() {
    

       let requesrDetails = {
         service_id: this.pageParams.id,
         request_title: 'service title',
         longitude: this.localUser.longitude,
         latitude: this.localUser.latitude,
         country_id: this.DataFromModal.country_id || 45,
         city_id: this.DataFromModal.city_id || 65,
         district_id: this.DataFromModal.district_id || 56,
         user_id: this.localUser.id,
         ...this.RequestForm.value
       };


       console.log('almost request data',requesrDetails, this.RequestForm);

       this.RequestForm.valid?(console.info('Your Form is Valid')):(console.warn('You form Errors', this.RequestForm.errors))
    }
  
}
