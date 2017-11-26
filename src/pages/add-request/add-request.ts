import {AppUtilFunctions} from './../../app/appglobal/app.utilfuns';
import {ServicesProvider} from './../../providers/services/services';
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Events, ModalController} from 'ionic-angular';

import {GetLocation} from "../get-location/get-location";
import {FormGroup, FormBuilder, Validators, FormControl, FormArray} from '@angular/forms';
import {ILocalUser} from '../../app/appglobal/app.interfaces';


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
  FormsShapes: any[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public appUtils: AppUtilFunctions,
              public events: Events,
              public services: ServicesProvider,
              formBuilder: FormBuilder) {

    this.pageParams = this.navParams.get('pageData');

    console.log('params data from sub category page', this.pageParams);

    this.RequestForm = formBuilder.group({
      order_title: ['', Validators.required],
      address: ['', Validators.required],
      forms: formBuilder.group({})
    });

  }

  ionViewWillEnter() {


  }

  async ionViewDidLoad() {
    // Run After Page Already Loaded

    this.localUser = await this.appUtils.getUserInfo();

    this.services.getServiceFormShape(
      {
        "user_id": 3,
        "verifycode": this.localUser.verifycode || "$2y$12$XQBdOjshGvoSRcT6uTlJaOkOiV.htMTyyT09IXxdjHrSQeoc/vgkO",
        "lang_code": this.pageParams.lang_code,
        "service_id": this.pageParams.id,
      }
    ).subscribe(({status, data, error}) => {

      if (status === 'success') {

        let groupByType = type => data.forms.filter(x => x.type == type);
        
        let currentFormInputs = ['select', 'input', 'textarea', 'checkbox', 'file'];

        console.log(data.forms);

        this.FormsShapes = data.forms;

        for (let input of currentFormInputs) {
          if (groupByType(input).length > 0) {

            this.newFormDs[input] = groupByType(input)
            
            this.newFormDs[input].forEach(inputControl => {

              let forms = this.RequestForm.get('forms') as FormGroup;
              if (input === 'checkbox') {
                // fill checkbox array with valueId
                
                let fillCheckControls = ()=>{

                };

                forms.addControl(inputControl.id, new FormArray([], Validators.required))

                /* fill checkboxs with object {valueId: boolean Val}
                let fillCheckControls = ()=>{

                  let controlsArray = {};
                  for (let num of inputControl.sub) {
                    controlsArray[num.id] = new FormControl(false);
                  }
                  return controlsArray;

                }
                forms.addControl(inputControl.id, new FormGroup(fillCheckControls()))

                */
              }
              else {

                forms.addControl(inputControl.id, new FormControl('', Validators.required))
              }

            });
          }
        }

        console.log('new Form Data structure', this.newFormDs);

      } else {
        console.warn(error)
      }
    });


    // For Development Only

    //this.sendRequest();

  }

  locationmodal() {
    let getlocationModal = this.modalCtrl.create('GetLocation', {
      pageData: {
        lat: '30.4446546',
        lng: '20.484897',
        service_id: this.pageParams.id,
        skipSearch: true
      }
    });
    getlocationModal.present();
    getlocationModal.onDidDismiss(data => {
      // Saving this info to local storage after updating user profile info
    })
  }


  openModal() {
    let modal = this.modalCtrl.create('PlacesModalPage');

    modal.onDidDismiss(data => {
      console.log('data from modal', data);
      if (data.governorate || data.city) {
        this.DataFromModal = data;
        this.MreqAddress = data.governorate + (data.city ? ' - ' + data.city + (data.district ? ' - ' + data.district : '') : '');
        this.RequestForm.get('address').setValue(data.governorate + (data.city ? ' - ' + data.city + (data.district ? ' - ' + data.district : '') : ''));
      
      }
      });

    modal.present()
  }


  sendRequest() {


    let requesrDetails = {
      service_id: this.pageParams.id,
      longitude: this.localUser.longitude,
      latitude: this.localUser.latitude,
      country_id: this.DataFromModal.country_id || 45,
      city_id: this.DataFromModal.city_id || 65,
      district_id: this.DataFromModal.district_id || 56,
      user_id: this.localUser.id,
      sector_id: 15,
      ...this.RequestForm.value
    };


    console.log('almost request data', requesrDetails, this.RequestForm);

    this.RequestForm.valid ? (console.info('Your Form is Valid')) : (console.warn('You form Errors is Not Valid'))

    let loopErrors = (formGroup:FormGroup)=>{
      for (let control of Object.keys(formGroup.controls)) {
        if (formGroup.get(control) instanceof FormGroup) {
          loopErrors(formGroup.get(control) as FormGroup)
        } else {
          console.warn(control, formGroup.get(control).errors)
        }       
      }
    }

    loopErrors(this.RequestForm);
    
  }

  doClick(option) {
    console.log('do click', option)
  }

  changed(event,checkInputId, checkOptionId) {
    console.log('checkbox changed', event.value, checkInputId, checkOptionId);

    let checkInput = this.RequestForm.get('forms').get(checkInputId) as FormArray;
    if (event.value === true) {

      checkInput.push(new FormControl(checkOptionId));
    } else {
      checkInput.removeAt(checkInput.value.indexOf(checkOptionId))
      
    }
  }

}
