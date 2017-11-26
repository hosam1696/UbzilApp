import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController, ToastController, ActionSheetController, ModalController } from 'ionic-angular';

import {TranslateService} from 'ng2-translate';

import { UserProvider } from './../../providers/user/user';
import {Components} from "../../providers/components";

import {SMS} from "../../providers/sms";
import {API} from "../../providers/api";
import {Login} from "../login/login";
import {GetLocation} from "../get-location/get-location";

import {AppUtilFunctions} from '../../app/appglobal/app.utilfuns';
//import { ServicesProvider } from './../../providers/services/services';
//import { IHomeServices, IHomeServiceResponse } from '../../app/appglobal/app.interfaces';


@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class Signup {
    step: any;
    loader: boolean = false;
    // Step 1
    mobile: any;
    CountryCode: any;
    // Step 2
    serverVerCode: any;
    inputVerCode:any;
    // step 3 finder OR provider
    MembershipType: any;    
    //  step 4 Signup Information
    validatEmailPattern:any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    fullname:any;
    username: any;
    email: any;
    password: any;
    repassword: any;
    gender: any;
    phonenum: any[];    
    // step 5 services data for provider
    isEnabled:boolean=true;
    categoryServices:any;
    categoryServicesKey:string;
    userServices:any;
    serviceType:number;
    // previous step that send to navpar signcategory and back store in it
    prevSteps:any;
    // step 6 last complete data for provider
    locationOnMap: string = '';    
    latitude: any;
    longitude: any;
    country: any;
    countries:any[];
    governorate: any;
    governorates:any[];
    city: any;
    cities:any[];
    district: any;
    districts:any[];
    workplace: any[];
    sectors:any[];
    
    constructor(
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public translateService: TranslateService,
        public toastCtrl: ToastController,
        public actionSheetCtrl: ActionSheetController,
        public loadingCtrl: LoadingController,
        public events: Events,
        public sms: SMS,
        public appUtils: AppUtilFunctions,
        private userProvider: UserProvider,
        public api: API,
        public com: Components,
    ) {
        console.log('******************** signUp Load ***************')
        this.categoryServices = this.navParams.get('userServicesPageData');
        if(this.categoryServices){
            this.prevSteps =  this.categoryServices.prevSignCategoryData;            
            console.log('previous step from signcategory :' , this.prevSteps);
            if(this.categoryServices.allServices){
                console.log('categoryServices :' , this.categoryServices.allServices);                
                this.isEnabled = false;
                this.step = 5;
    
                for (let key in this.categoryServices.allServices) {
                    this.categoryServicesKey = key;
                }
                console.log('categoryServices array:' , this.categoryServices.allServices);
                console.log('categoryServices key :' , this.categoryServicesKey);
    
                this.userServices = this.categoryServices.allServices[this.categoryServicesKey];
                console.log('userServices array :' , this.userServices);
    
                this.serviceType  = this.userServices[0]['serviceType'];
                console.log('serviceType value :' , this.serviceType);
    
                
            }else{
                this.step = 1;
            }
        }else{
            this.step = 1;
        }
        console.log('Step in Constructor Opened:' + this.step);
        
        this.CountryCode = '';
        this.mobile = '';        
        this.serverVerCode = '';
        this.inputVerCode='';
        this.MembershipType = 'finder';
        this.phonenum = [
            {"label": 'work'}
        ];
        this.workplace = [
            {"Governorate": 0, "districts": 0},
            {"Governorate": 0, "districts": 0}
        ];
        this.sectors    = (this.sectors instanceof Array) ? this.sectors : [];
        this.sectors[0] = (this.sectors[0] instanceof Array) ? this.sectors[0] : [];
        this.sectors[1] = (this.sectors[1] instanceof Array) ? this.sectors[1] : [];

    }

    async ionViewDidEnter() {

        this.translateService.get('Location on map')
        .subscribe(value => {this.locationOnMap = value});
        // Run After Page Already Entered
        let currentLang:string = await this.appUtils.CurrentLang;
        console.log('%s%c%s', 'The Language you are using now is ', 'color: red;font-weight:bold', currentLang)
    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
    }
    
    locationmodal() {
        let pageData:any = null;
        if (this.latitude  && this. longitude ) {
            pageData = { latitude: this.latitude, longitude: this.longitude };
        }
        let modal = this.modalCtrl.create(GetLocation, {pageData});
        modal.onDidDismiss((data) => {
          console.log('map data from modal', data);
          if (data && data.latitude && data.longitude) {
            //console.log(data);
            this.latitude = data.latitude;
            this.longitude = data.longitude;
            if (data.address)
              this.locationOnMap = data.address;
          }
    
        });
        modal.present();

        /* let getlocationModal = this.modalCtrl.create(GetLocation);
        getlocationModal.present();
        getlocationModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        }) */
    }
    
    // TODO: Go to signin
    goSignin() {
        this.navCtrl.push(Login);
    }

    // TODO: check if mobile exist and get confirm code to sign up
    signUpNext(){
        console.log('CountryCode',this.CountryCode)        
        console.log('mobile number',this.mobile)
        if(this.CountryCode != ''){
            if(!isNaN(this.mobile) && this.mobile ){
                console.log(this.CountryCode+this.mobile," yes is complete number")
                this.userProvider
                .getConfirmCode({mobile : this.mobile})
                .subscribe(
                  data => {
                    if (data) {
                        this.serverVerCode = data;
                        console.log('server verifycode ',this.serverVerCode);                    
                        this.translateService.get('confirm-code-sent')
                        .subscribe( value => {this.appUtils.AppToast(value)})

                        this.step = 2;
                    }else{
                        this.translateService.get('mobile-exist')
                        .subscribe( value => {this.appUtils.AppToast(value)})
                        this.step = 1;
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
                
            }else{
                console.log('is number ?',this.mobile," No ")

                this.translateService.get('plz-true-number')
                .subscribe( value => {this.appUtils.AppToast(value)})

                this.step = 1;
            }
        }else{
            this.translateService.get('plz-select-country-code')
            .subscribe( value => {this.appUtils.AppToast(value)})
            this.step = 1;
        }
        //this.step = 2;
    }
    
    // TODO: return to first stem phone number
    Step1() {
        this.step = 1;
        console.log('step 1 cliked')
    }

    // TODO: check verifycode to sign up
    signUpConfirm(){
        if(this.inputVerCode == this.serverVerCode){
            console.log('your verifycode is true')
            this.step = 3;
        }else{
            console.log('your verifycode is false')
            this.translateService.get('plz-check-activecode')
            .subscribe( value => {this.appUtils.AppToast(value)})
            this.step = 2;
        }
    }

    // TODO: return to select  MembershipType
    Step3() {
        this.step = 3;
        console.log('step 3 cliked')
    }

    // TODO: fill reamin data by MembershipType as username....
    Step4(MembershipType) {
        this.step = 4;
        this.MembershipType = MembershipType;
        console.log(MembershipType);
    }
    
    // TODO: add more phone numbers for provider
    addmorePhones(phonenum) {
        var tel = {"label": 'work'};
        this.phonenum.push(tel);
        console.log("phones is array", this.phonenum);
    }
    
    // TODO: delete phone numbers for provider
    removePhones(i) {
        this.phonenum.splice(i, 1);
    }

    // TODO: last step complete SignUp when signup as Finder
    SignUpFinsh() {
        //let validatEmailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!this.fullname){
            this.translateService.get('plz-enter-fullname')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else if(!this.username){
            this.translateService.get('plz-enter-username')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else if(!this.email || !this.validatEmailPattern.test(this.email)){
            this.translateService.get('plz-enter-valid-mail')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else if(!this.password || this.password != this.repassword){
            this.translateService.get('password-not-match')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else if(!this.gender){
            this.translateService.get('plz-select-gender')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else{
            let signupData = {
                'level_id': 3,
                'active': '1',
                'lang_code': this.appUtils.CurrentLang,
                'fullname': this.fullname,
                'username': this.username,
                'email': this.email,
                'password': this.password,                
                'gender': this.gender,
                'country_code': this.CountryCode,                
                'mobile': this.mobile,
                'account_type':this.MembershipType
              }
            console.log('data sent to server', signupData)
            
            this.userProvider
            .addNewUser(signupData)
            .subscribe(({ data, errors })=> {
                if (!errors) {
                    //TODO: save the user data to local storage //and navigate to the tapPage
                    this.appUtils.storage.set('localUserInfo', data)
                    //TODO:  navigate to the tapPage
                    .then(() => {
                      this.navCtrl.setRoot('Tabs');
                    })
                    this.translateService.get('account-added')
                    .subscribe( value => {this.appUtils.AppToast(value)})
                }else{
                    if(errors.username){
                        // note error.name = 'username-exist' 
                        this.translateService.get(errors.username)
                        .subscribe( value => {this.appUtils.AppToast(value)})
                    }else{
                        // note error.email = 'email-exist' 
                        this.translateService.get(errors.email)
                        .subscribe( value => {this.appUtils.AppToast(value)})
                    }
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

    // TODO: check if previous data is true (if true select user services)
    Step5() {
        if(!this.fullname){
            this.translateService.get('plz-enter-fullname')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else if(!this.username){
            this.translateService.get('plz-enter-username')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else if(!this.email || !this.validatEmailPattern.test(this.email)){
            this.translateService.get('plz-enter-valid-mail')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else if(!this.password || this.password != this.repassword){
            this.translateService.get('password-not-match')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else{
            let checkData = {
                'username': this.username,
                'email': this.email
                }
            console.log('data sent to server', checkData)
            
            this.userProvider
            .checkUnique(checkData)
            .subscribe( errors => {
                    if (!errors) {
                        this.step = 5;
                        console.log('step 5 cliked')
                    }else{
                        if(errors.username){
                            // note error.name = 'username-exist' 
                            this.translateService.get(errors.username)
                            .subscribe( value => {this.appUtils.AppToast(value)})
                        }else{
                            // note error.email = 'email-exist' 
                            this.translateService.get(errors.email)
                            .subscribe( value => {this.appUtils.AppToast(value)})
                        }
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
    
    // TODO: remove user service after select it in step 5
    removeUserServices(i) {
        this.userServices.splice(i, 1);
        if(this.userServices.length <= 0){
            this.isEnabled = true;
        }
        console.log('userServices array after delete :' , this.userServices);
    }
    
    // TODO: Got To SignCategory to add userservices
    navigateTo(page: string, id:number): void {
        let prevSignupData = {
            'level_id': 3,
            'active': '1',
            'lang_code': this.appUtils.CurrentLang,
            'fullname': this.fullname,
            'username': this.username,
            'email': this.email,
            'password': this.password,                
            'country_code': this.CountryCode,                
            'mobile': this.mobile,
            'account_type':this.MembershipType,
            'userPhones':this.phonenum,            
        }
        //this.navCtrl.push(page, { pageData })
        this.navCtrl.push(page, {pageData: { id:id,prevSignupData:prevSignupData }})
    }
    
    // TODO: after add user service go to complet remain provider data (country, workplaces)
    Step6() {
        console.log('step 6 cliked')
        this.step = 6;
    }

    // TODO: get data of governarate and cities and districts
    cahngeCountry(value,type){
        console.log('********************* you click change country now *******************');
        console.log('parent value is', value, 'sub type is', type)
        let cityData = {
            'lang_code': this.appUtils.CurrentLang,
            'parent': value,
            'type': type
          }
        this.userProvider
        .getAllCities(cityData)
        .subscribe(({ data, errors })=> {
            if (data) {
                console.log('all places from server', data)                
                if(type == 'country'){
                    this.countries = data;
                    console.log('countries', this.countries)
                    this.governorates = [];
                    this.cities = [];
                    this.districts = [];
                }else if(type == 'Governorate'){
                    this.governorates = data;
                    console.log('governorates', this.governorates)
                    this.cities = [];
                    this.districts = [];
                }else if(type == 'city'){
                    this.cities = data;
                    console.log('cities', this.cities)
                    this.districts = [];
                }else{
                    this.districts = data;
                    console.log('districts', this.districts)
                }
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

    // TODO: get sectors or cities of workplaces
    getSectors(value,keeey){
        console.log('in sectors ', value , keeey , this.serviceType)
        let cityData = {
            'lang_code': this.appUtils.CurrentLang,
            'parent': value,
            'type': (this.serviceType == 1) ? 'sector' : 'city'
          }
        this.userProvider
        .getPlaces(cityData)
        .subscribe(({ status, data, errors })=> {
            if (data) {
                this.sectors[keeey] = data;
                console.log('sectors ', this.sectors[keeey])
                console.log('all sectors ', data)
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

    // TODO: add more workplaces for provider
    moreworkplace(workplace) {
        var p = {"Governorate": 0, "districts": 0};
        this.workplace.push(p);
        console.log("workplace is array", this.workplace);
        // var p = {"Governorate": this.Governorate, "districts": this.District};
        // this.workplace.push(p);
        // console.log("tis is array", this.workplace);
    }

    // TODO: delete workplace for provider
    removeworkplace(x) {
        if(this.workplace.length <= 1){
            this.translateService.get('not-allowed-delete-workplace')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else{
            this.workplace.splice(x, 1);
            console.log("workplace after delete", this.workplace);
        }
        
    }
    
    // TODO: last step complete SignUp when signup as Provider
    Step7(){
        if(!this.district){
            this.translateService.get('plz-select-full-residence')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else if(this.workplace[0]['districts'] == 0){
            this.translateService.get('plz-enter-workspace')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else if(this.userServices.length <= 0){
            this.translateService.get('plz-select-one-service')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else{
            let signupData = { ...this.prevSteps,
                'parent_id' : this.district,
                'country_id': this.country,
                'latitude': this.latitude,
                'longitude': this.longitude,
                'userWorkplaces':this.workplace,
                'userServices':this.userServices,
            }
            console.log('last step all data to server from Provider', signupData)
    
            this.userProvider
            .addNewUser(signupData)
            .subscribe(({ data, errors })=> {
                if (!errors) {
                    //TODO: save the user data to local storage //and navigate to the tapPage
                    this.appUtils.storage.set('localUserInfo', data)
                    //TODO:  navigate to the tapPage
                    .then(() => {
                      this.navCtrl.setRoot('Tabs');
                    })
                    this.translateService.get('account-added')
                    .subscribe( value => {this.appUtils.AppToast(value)})
                }else{
                    if(errors.username){
                        // note error.name = 'username-exist' 
                        this.translateService.get(errors.username)
                        .subscribe( value => {this.appUtils.AppToast(value)})
                    }else{
                        // note error.email = 'email-exist' 
                        this.translateService.get(errors.email)
                        .subscribe( value => {this.appUtils.AppToast(value)})
                    }
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
    
    // TODO: set image path uploade
    imagePath(img) {
        return this.appUtils.UPLOAD_FOLDER+'service/icons/'+img
    }

}
