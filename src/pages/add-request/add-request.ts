import { Push } from '@ionic-native/push';
import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
import { ServicesProvider } from './../../providers/services/services';
import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';
import {TranslateService} from 'ng2-translate';
//import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {GetLocation} from "../get-location/get-location";

@IonicPage()
@Component({
  selector: 'page-add-request',
  templateUrl: 'add-request.html',
})
export class AddRequest {
  order:any; 
  pageParams: any;
  sectorParams: any;
  forms: any ;
  MreqAddress: string = '';
  localUser: any;
  DataFromModal: any;
  loader: boolean = false;
  appError : boolean = false;
  locationOnMap: string = '';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public appUtils:AppUtilFunctions,
    public events: Events,
    public services: ServicesProvider,
    public translateService: TranslateService,
  ) {    
    console.log('******************** AddRequest Load ***************')
    this.pageParams = this.navParams.get('pageData');
    console.log('params data from sub category page OR PlaceModel', this.pageParams)
    if(this.pageParams.order){
      this.order = this.pageParams.order;
      if(this.pageParams.placeData.sector_id){
        this.MreqAddress = this.pageParams.placeData.governorate + (this.pageParams.placeData.sector ? ' - ' + this.pageParams.placeData.sector : '');
        this.order.sector_id = this.pageParams.placeData.sector_id;

      }else{
        this.translateService.get('plz-enter-request-place')
        .subscribe(value => {this.MreqAddress = value})
      }
    }else{
      this.order = {
        service_id:this.pageParams.id,
        order_title: '',
        longitude: '', //longitude: this.localUser.longitude,
        latitude: '',  //latitude: this.localUser.latitude,
        sector_id: '',
        user_id: '',//this.localUser.id,
        verifycode: '',
        form:[]
      }
      this.translateService.get('plz-enter-request-place')
      .subscribe(value => {this.MreqAddress = value});
    }
    
  }

  async ionViewWillEnter(){
    
    // TODO: set title for add map translated any lang
    this.translateService.get('Click to add location')
    .subscribe(value => {this.locationOnMap = value});
    
    // TODO: store data of user when login in 
    this.localUser = await this.appUtils.storage.get('localUserInfo');
    console.log('awaited user Info in AddRequest', this.localUser)
    
  }

  ionViewDidLoad() {
    // Run After Page Already Loaded

    this.services.getServiceFormShape(
      {
        "lang_code": this.pageParams.lang_code,
        "service_id": this.pageParams.id,
      }
    ).subscribe(({status, data, error}) => {
      if (status === 'success') {
        console.log('returned Data forms', data);
        this.forms = data.forms;
        //console.log('new Form Data structure', this.order);
        
      } else {
        console.warn(error)
        }
    })
  }

  locationmodal() {
    let pageData:any = {comeFrom: 'addrequest'};
    if (this.order.latitude  && this.order.longitude ) {
        pageData = {...pageData,...{latitude: this.order.latitude, longitude: this.order.longitude }};
    }
    let modal = this.modalCtrl.create(GetLocation, {pageData});
    modal.onDidDismiss((data) => {
      console.log('map data from modal', data);
      if (data && data.latitude && data.longitude) {
        //console.log(data);
        this.order.latitude = data.latitude;
        this.order.longitude = data.longitude;
        if (data.address)
          this.locationOnMap = data.address;
      }

    });
    modal.present();
    console.log('order on maaaaaaaaaaaaaaaap', this.order);
  }

  openModal() {
    this.navCtrl.push('PlacesModalPage', {pageData: { order:this.order }});
    /* let modal = this.modalCtrl.create('PlacesModalPage');

    modal.onDidDismiss(data => {
      console.log('data from modal', data);
      this.DataFromModal = data;
      // to set sector_id in order object with value 
      this.order.sector_id = data.sector_id;
      // text appear in title address
      (data.sector_id) ? this.MreqAddress = data.governorate + (data.sector ? ' - ' + data.sector : '') : this.MreqAddress = 'يرجي اختيار العنوان';
    });

    modal.present() */
  }

  changCheckBox(value, inputId, isChecked :boolean) {
    //isChecked = 'true'
    console.log(value , inputId, isChecked);
    this.order.form[value] = (this.order.form[value] instanceof Array) ? this.order.form[value] : [];
    if(isChecked) {
      this.order.form[value].push(inputId);
    } else {
      var _index = this.order.form[value].indexOf(inputId);
      this.order.form[value].splice(_index, 1);
    }
    console.log(this.order.form);

  }

  sendRequest() {
    // set values of user_id and service_id
    this.order.user_id = this.localUser.id;
    this.order.verifycode = this.localUser.verifycode;
    //this.order.service_id = this.pageParams.id;

    //validation

    // order_title validation
    if (!this.order.order_title) {
      this.translateService.get('plz-enter-request-name')
      .subscribe( value => {this.appUtils.AppToast(value)})
      this.appError = true;
    }
    // sector_id validation
    else if (!this.order.sector_id) {
      this.translateService.get('Request-successfully')
      .subscribe( value => {this.appUtils.AppToast(value)})
      this.appError = true;
    }
    // form data validation
    else{
      for(let i of this.forms){
        //console.log('checkAcc value',i['accurate_message']);
        if (i['checkAcc'] == 1) {
          if (!this.order.form[i['id']]) {
            this.appUtils.AppToast(i['accurate_message']);
            this.appError = true;
            return false;            
            //console.log(i['id'], i['accurate_message']);
          }
        }
      }
    }

    if(!this.appError){
      // send add request here
      this.loader = true;
      console.log('you have entered ', this.order);
      this.services
        .addServiceOrders(this.order)
        .subscribe(
          orderData => {
            console.log(orderData);
            if (orderData.status === 'success') {
              this.translateService.get('Request-successfully')
              .subscribe( value => {this.appUtils.AppToast(value)});
              // this.appUtils.storage.set('localUserInfo', userData.data)
              //   .then(() => {
              //     this.navCtrl.setRoot('Tabs');
              //   })
            }
          },
          err => {
            this.loader = false;
            if (err.error instanceof Error) {
                console.warn('client side error', err)
            } else {
              console.warn('server side error', err);
              }
          },
          () => {
            this.loader = false;
          }
        
        );
    }
  }

    
  
}