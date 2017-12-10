// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, ViewController, NavParams, Events, ActionSheetController, ToastController} from 'ionic-angular';
import {TranslateService} from 'ng2-translate';
import { Http } from '@angular/http';
// Providers
import { UserProvider } from './../../providers/user/user';
// Req Pages
import {GetLocation} from "../get-location/get-location";
import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';



@IonicPage()
@Component({
    selector: 'page-edit-profile',
    templateUrl: 'edit-profile.html',
})
export class EditProfile {
    //phonenum: any[];
    //Citys: any[];
    //workplace: any[];
    //Districts: any[];
    public phone: string;
    District: any;
    closetext: any;
    toasttext: any;
    //Governorate: any;
    userLocal:any;
    userEditData:any;
    MreqAddress: string = '';
    currentLang: string;
    country: any;
    countries:any[];
    governorate: any;
    governorates:any[];
    city: any;
    cities:any[];
    district: any;
    districts:any[];
    sectors:any[];
    serviceType:number;
    validatEmailPattern:any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public events: Events,
        public translateService: TranslateService,
        private toastCtrl: ToastController,
        public actionSheetCtrl: ActionSheetController,
        public modalCtrl: ModalController,
        public appUtils: AppUtilFunctions,
        public userProvider: UserProvider,
        public http: Http, 
    ){
        console.log('*************** EditProfile ******************');
        this.currentLang = this.appUtils.CurrentLang;

        /* this.phonenum = this.navParams.get('TelList');
        for (let i in this.phonenum) {
            console.log("number is " + this.phonenum[i].number);
        }

        console.log(this.phonenum); */
        /* this.Citys = [
            {"id": 0, "Governorate": "القاهرة"},
            {"id": 1, "Governorate": "الجيزة"},
            {"id": 2, "Governorate": "الدقهلية"}
        ];
        this.Districts = [
            {"id": 0, "district": "الدقى"},
            {"id": 1, "district": "اجا"},
            {"id": 2, "district": "كرداسة"}
        ];
        this.workplace = [
            {"Governorate": 0, "districts": 2},
            {"Governorate": 1, "districts": 0},
            {"Governorate": 2, "districts": 1}
        ]; */

        /* this.District = this.Districts[0].id;
        this.Governorate = this.Citys[0].id; */

        /* this.sectors    = (this.sectors instanceof Array) ? this.sectors : [];
        this.sectors[0] = (this.sectors[0] instanceof Array) ? this.sectors[0] : [];
        this.sectors[1] = (this.sectors[1] instanceof Array) ? this.sectors[1] : []; */
    }

    ionViewDidEnter() {
        // Run After Page Already Entered

    }

    ionViewDidLoad() {
        this.translateService.get('Changes-saved')
            .subscribe(lang => {
                this.toasttext = lang;
            })
        this.translateService.get('Close')
            .subscribe(lang => {
                this.closetext = lang;
            })

        this.appUtils.storage.get('localUserInfo')
        .then((data)=>{
            this.userLocal = data;
            console.log('localUserInfo in EditProfile',this.userLocal);
            this.getUserToEdit(this.userLocal.id);
        })
    }
    
    // TODO: Get User Data IF who login Open other user Edit profile
    getUserToEdit(id){
        this.userProvider.getUserToEdit({"id": id, "lang_code":this.currentLang}).subscribe((data) => {
            if (data) {
                console.log('user Data To Edit From server', data);
                this.userEditData = data;
                if(this.userEditData.latitude){
                  this.getMapAddress(this.userEditData.latitude, this.userEditData.longitude);
                }else{
                  this.translateService.get('no_google_map')
                  .subscribe(value => {this.userEditData.MreqAddress = value});
                }
                this.getPlaces(0,'country');
                this.getPlaces(this.userEditData.country_id,'Governorate');
                this.getPlaces(this.userEditData.governorate_id,'city');
                this.getPlaces(this.userEditData.city_id,'district');
                if (this.userEditData['userWorkplaces']) {
                    //console.log(this.userEditData['userWorkplaces'][0]['districts'])
                    this.sectors    = (this.sectors instanceof Array) ? this.sectors : [];                    
                    for (let index = 0; index < this.userEditData['userWorkplaces'].length; index++) {
                        this.sectors[index] = [{'id':this.userEditData['userWorkplaces'][index]['districts'],'name':this.userEditData['userWorkplaces'][index]['districtsName']}];                
                    }
                    console.log('seeeeeeeeeectors database', this.sectors)
                }
                if (!this.userEditData['userPhones']) {
                    this.userEditData['userPhones'] = [
                        {"label": 'work'}
                    ];
                }
            }
            
        }, err => {
            if (err.error instanceof Error) {
                console.warn('client side errror', err)
            } else {
                console.warn('server side error', err)
            }
        }, () => {
        })
    }
    
    // TODO: Get map address using lon and lat
    getMapAddress(latitude, longitude) {
        
        let geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&key=AIzaSyBL9-cIsQpwffcZ5NCHEuHilTG_7sEhSXg';
        this.http.get(geocodeUrl)
          .map(res=>res.json())
          .pluck('results')
          .subscribe(
            result=>{
            console.log('response from geocoding', result[0].formatted_address);
            this.userEditData.MreqAddress = result[0].formatted_address;
          },
            err=> {
            console.warn(err);
            })
    }
    
    // TODO: get data of governarate and cities and districts
    getPlaces(parent,type){
        //console.log('parent value is', parent, 'sub type is', type)
        let cityData = {
            'lang_code': this.currentLang,
            'parent': parent,
            'type': type
          }
        this.userProvider
        .getAllCities(cityData)
        .subscribe(({ data, errors })=> {
            if (data) {
                //console.log('all places from server', data)                
                if(type == 'country'){
                    this.countries = data;
                    console.log('countries in editProfile', this.countries)
                }else if(type == 'Governorate'){
                    this.governorates = data;
                    console.log('governorates in editProfile', this.governorates)
                }else if(type == 'city'){
                    this.cities = data;
                    console.log('cities in editProfile', this.cities)
                }else{
                    this.districts = data;
                    console.log('districts in editProfile', this.districts)
                }
            }
          },
          err => {
            if (err.error instanceof Error) {
                console.warn('client side error', err)
            } else {
              console.warn('server side error', err);
              }
          },
          () => {
          }
        );
    }
    
    // TODO: get data of governarate and cities and districts
    cahngeCountry(value,type){
        console.log('********************* you click change country now *******************');
        console.log('parent value is', value, 'sub type is', type)
        let cityData = {
            'lang_code': this.currentLang,
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
                    this.userEditData.parent_id = 0;
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
            if (err.error instanceof Error) {
                console.warn('client side error', err)
            } else {
              console.warn('server side error', err);
              }
          },
          () => {
          }
        );
    }
    // TODO: change  map address using lon and lat
    locationmodal() {
        let pageData:any = {comeFrom: 'EditProfile'};
        if (this.userEditData.latitude  && this.userEditData.longitude ) {
            pageData = { ...pageData, ...{latitude: this.userEditData.latitude, longitude: this.userEditData.longitude} };
        }
        let modal = this.modalCtrl.create(GetLocation, {pageData});
        modal.onDidDismiss((data) => {
            console.log('map data from modal', data);
            if (data && data.latitude && data.longitude) {
                //console.log(data);
                this.userEditData.latitude = data.latitude;
                this.userEditData.longitude = data.longitude;
                if (data.address) this.userEditData.MreqAddress = data.address;
            }
            console.log('userEditData after close map model', this.userEditData);
        });
        modal.present();
    }

    // TODO: get sectors or cities of workplaces
    getSectors(value,keeey){
        console.log('in sectors in EditProfile ', value , keeey , this.userEditData.serviceType)
        let cityData = {
            'lang_code': this.appUtils.CurrentLang,
            'parent': value,
            'type': (this.userEditData.serviceType == 1) ? 'sector' : 'city'
          }
        this.userProvider
        .getPlaces(cityData)
        .subscribe(({ status, data, errors })=> {
            if (data) {
                this.sectors[keeey] = data;
                this.userEditData.userWorkplaces[keeey]['districts'] = 0;
                console.log('sectors of key ', this.sectors[keeey])
                console.log('all sectors OR Cities in EditProfile ', data)
            }
          },
          err => {
            if (err.error instanceof Error) {
                console.warn('client side error', err)
            } else {
              console.warn('server side error', err);
              }
          },
          () => {
          }
        );
    }

    dismiss(id) {
        console.log(id);
        this.viewCtrl.dismiss(id);
    }

    // TODO: add more workplaces for provider
    moreworkplace(workplace) {
        var p = {"Governorate": 0, "districts": 0};
        this.userEditData.userWorkplaces.push(p);
        console.log("workplace is array", this.userEditData.userWorkplaces);
    }
    
    // TODO: delete workplace for provider
    removeworkplace(x) {
        if(this.userEditData.userWorkplaces.length <= 1){
            this.translateService.get('not-allowed-delete-workplace')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else{
            this.userEditData.userWorkplaces.splice(x, 1);
            console.log("workplace after delete", this.userEditData.userWorkplaces);
        }
    }


    /* changeImage() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Upload Image',
            buttons: [
                {
                    icon: 'folder',
                    text: 'From file',
                    handler: () => {
                        console.log('Destructive clicked');
                    }
                }, {
                    icon: 'camera',
                    text: 'From camera',
                    handler: () => {
                        console.log('Archive clicked');
                    }
                }, {
                    text: 'cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    } */

    // TODO: add more phone numbers for provider
    addmorePhones(phonenum) {
        var tel = {"label": 'work',"num_value":''};
        this.userEditData.userPhones.push(tel);
        console.log("phones is array", this.userEditData.userPhones);
    }
    
    // TODO: delete phone numbers for provider
    removePhones(i) {
        this.userEditData.userPhones.splice(i, 1);
    }

    SaveChanges() {
        console.log('datthat edited will send to server',this.userEditData);
        if(!this.userEditData.old_password){
            this.translateService.get('old_password_required')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else if(isNaN(this.userEditData.mobile) && !this.userEditData.mobile ){
            this.translateService.get('plz-true-number')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else if(!this.userEditData.fullname){
            this.translateService.get('plz-enter-fullname')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else if(!this.userEditData.username){
            this.translateService.get('plz-enter-username')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else if(!this.userEditData.email || !this.validatEmailPattern.test(this.userEditData.email)){
            this.translateService.get('plz-enter-valid-mail')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else if(this.userEditData.password && this.userEditData.password != this.userEditData.repassword){
            this.translateService.get('password-not-match')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else if(!this.userEditData.parent_id){
            this.translateService.get('plz-select-full-residence')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else if(this.userEditData.userWorkplaces[0]['districts'] == 0){
            this.translateService.get('plz-enter-workspace')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else{
            let signupData = { ...this.userEditData,
                'lang_code': this.currentLang
              }
            console.log('last step all data to server from Provider', signupData)
    
            this.userProvider
            .editUser(signupData)
            .subscribe(({ data, errors })=> {
                if (data) {
                    /* //TODO: save the user data to local storage //and navigate to the tapPage
                    this.appUtils.storage.set('localUserInfo', data)
                    //TODO:  navigate to the tapPage
                    .then(() => {
                      this.navCtrl.setRoot('Tabs');
                    }) */
                    this.appUtils.storage.remove('localUserInfo')
                    .then(() => {
                        this.appUtils.storage.set('localUserInfo', data)
                    })
                    this.dismiss(data.id);
                    let toast = this.toastCtrl.create({
                        message: this.toasttext,
                        position: "middle",
                        showCloseButton: true,
                        closeButtonText: this.closetext,
                        duration: 3000
                    });
                    toast.present();
                    /* this.translateService.get('Changes-saved')
                    .subscribe( value => {this.appUtils.AppToast(value)}) */
                }else{
                    if(errors.old_password){
                        // note error.old_password = 'old_password_error' 
                        this.translateService.get(errors.old_password)
                        .subscribe( value => {this.appUtils.AppToast(value)})
                    }else if(errors.username){
                        // note error.username = 'username-exist'  
                        this.translateService.get(errors.username)
                        .subscribe( value => {this.appUtils.AppToast(value)})
                    }else if(errors.email){
                        // note error.email = 'email-exist' 
                        this.translateService.get(errors.email)
                        .subscribe( value => {this.appUtils.AppToast(value)})
                    }else{
                        // note error.mobile = 'mobile-exist' 
                        this.translateService.get(errors.mobile)
                        .subscribe( value => {this.appUtils.AppToast(value)})
                    }
                }
              },
              err => {
                if (err.error instanceof Error) {
                    console.warn('client side error', err)
                } else {
                  console.warn('server side error', err);
                  }
              },
              () => {
              }
            
            );
        }
        /* this.dismiss();
        let toast = this.toastCtrl.create({
            message: this.toasttext,
            position: "middle",
            showCloseButton: true,
            closeButtonText: this.closetext,
            duration: 3000
        });
        toast.present(); */
    }

}
