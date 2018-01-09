import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
// Main Components
import {Component} from '@angular/core';
//import { DatePipe } from '@angular/common';

import {
  ActionSheetController,
  Events,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  PopoverController
} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Http } from '@angular/http';
// Providers
import {TranslateService} from 'ng2-translate';
import { UserProvider } from './../../providers/user/user';
// Req Pages
import {EditProfile} from "../edit-profile/edit-profile";
import {GetLocation} from "../get-location/get-location";
import {AddReview} from '../addreview/addreview';
import {WorkTime} from '../work-time/work-time';
import {PopoverContentPage} from '../popover/popover';
import {Reservation} from '../reservation/reservation';
import {PriceList} from '../price-list/price-list';
import {AppPlugins} from "../../app/appglobal/app.plugins";
import {ICameraType} from "../../app/appglobal/app.enums";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  priceList: any[];
  TelList: any[];
  section: string = 'two';
  somethings: any = new Array(20);
  user: any;
  titletext: any;
  foldertext: any;
  cameratext: any;
  canceltext: any;
  currentLang: string;
  //new programing
  pageParams: any;
  showLoader: boolean = true;
  userData:any;
  userRaters:any;
  userLocal:any;
  MreqAddress: string = '';
  constructor(
    public navCtrl: NavController,
    public events: Events,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public translateService: TranslateService,
    public actionSheetCtrl: ActionSheetController,
    public popoverCtrl: PopoverController,
    public appUtils: AppUtilFunctions,
    public appPlugins: AppPlugins,
    public userProvider: UserProvider,
    public http: Http,
    public inappbrowser: InAppBrowser,
  ){

    console.log('*************** ProfilePage ******************');
    this.pageParams = this.navParams.get('pageData');
    console.log('pageParams >>> ', this.pageParams);

    /* this.priceList = [
      {"id": 21, "title": "فيروس س", "price": "250"},
      {"id": 23, "title": "تحليل اتش ار", "price": "50"},
      {"id": 24, "title": "تحليل دي ان اي ", "price": "110"}
    ]; */

    this.currentLang = this.appUtils.CurrentLang;
  }
    
  // static ionViewDidLoad() {
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.appUtils.storage.get('localUserInfo')
    .then((data)=>{
      this.userLocal = data;
      console.log('localUserInfo in ProfilePage',this.userLocal);
        this.getUserInfo(this.pageParams.id);
        this.getUserInfoRating(this.pageParams.id);
    })
  }
  
  // TODO: Get User Data IF who login Open other user profile
  getUserInfo(id){
    this.userProvider.getUserInfo({"login_id": this.userLocal.id, "id": id, "lang_code":this.currentLang}).subscribe((data) => {
        if (data) {
            console.log('user details From server', data);
            this.userData = data;
            if(this.userData.latitude){
              this.getMapAddress(this.userData.latitude, this.userData.longitude);
            }else{
              this.translateService.get('no_google_map')
              .subscribe(value => {this.userData.MreqAddress = value});
            } 
        }
        
    }, err => {
        //this.loader = false;
        if (err.error instanceof Error) {
            console.warn('client side errror', err)
        } else {
            console.warn('server side error', err)
        }
    }, () => {
        this.showLoader = false;
        this.priceList  = this.userData.priceList;
        console.log('price list from user id', this.priceList  )
    })
  }

  // TODO: Get User Data IF who login Open other user profile
  getUserInfoRating(id){
    this.userProvider.getUserInfoRating({"id": id}).subscribe((data) => {
      console.log('rater From server', data);
        if (data) {
            this.userRaters = data; 
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
  
  // TODO: open phone worlk list popover
  openPopover(myEvent, mobile) {
    this.TelList = (!mobile) ? [{'num_value':this.userData.mobile}] : [...[{'num_value':this.userData.mobile}],...mobile];
    let popover = this.popoverCtrl.create('PopoverContentPage', { TellList:this.TelList});
    popover.present({
        ev: myEvent
    });
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
        this.userData.MreqAddress = result[0].formatted_address;
      },
        err=> {
        console.warn(err);
        })
  }

  // TODO: Open map using lon and lat in browser
  openBrowserMap(maps = '') {
    if (this.userData.latitude && this.userData.longitude) {
      maps = this.userData.latitude + ','+this.userData.longitude;
      console.info(maps);
      const url = 'https://www.google.com/maps?q=' + maps + '&z=17&hl=ar';
      const tab = this.inappbrowser.create(url);
  
      tab.show();
    }else{
      this.translateService.get('no_google_map')
      .subscribe( value => {this.appUtils.AppToast(value)})
    }
  }


  // TODO: set image path uploade
  imagePath(img,type) {
      return this.appUtils.UPLOAD_FOLDER+type+'/'+img;    
  }

  imageActionSheet() {
    this.translateService.get('Upload-Image')
      .subscribe(lang => {
        this.titletext = lang;
      })
    this.translateService.get('From-file')
      .subscribe(lang => {
        this.foldertext = lang;
      })
    this.translateService.get('From-camera')
      .subscribe(lang => {
        this.cameratext = lang;
      })
    this.translateService.get('Cancel')
      .subscribe(lang => {
        this.canceltext = lang;
      })

    let imageactionSheet = this.actionSheetCtrl.create({
      title: this.currentLang === 'ar'?'تحميل صورة':'Upload Image',
      buttons: [
        {
          icon: 'folder',
          text: this.currentLang==='ar'?'اختيار من البوم الصور':'choose from Photo Library',
          handler:  () => {
            console.log('Photo Library clicked');
            this.getCameraImage(ICameraType.PHOTOLIBRARY)
          }
        }, {
          icon: 'camera',
          text: this.currentLang === 'ar'?'التقاط من الكاميرا':'Capture from Camera',
          handler: () => {

            console.log('camera clicked');

            this.getCameraImage(ICameraType.CAMERA)
          }
        }, {
          text: this.currentLang === 'ar'?'الغاء':'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    })
    imageactionSheet.present();


  }

  async getCameraImage(CameraType:ICameraType) {


    let img = await this.appPlugins.openCamera(CameraType);


    console.log('img from camera' , img);
  }
  
  // TODO: Go To show profile page of rater
  goProfilePage(id){
    this.navCtrl.push('ProfilePage',{pageData:{id:id}});
  }
  
  protected navigateTo(page: string, isModal: boolean = false, pageData?: any): void {
    if (isModal) {
      console.log('navigateTo data', pageData);      
      let EditProfileModal = this.modalCtrl.create(page, {pageData});
      EditProfileModal.present();
      EditProfileModal.onDidDismiss(dismissData => {

        if (page === 'EditProfile') {
          // Do some interesting stuff here
          console.log('backed',dismissData);
          this.getUserInfo(dismissData);
          this.getUserInfoRating(dismissData);
        } else if (page === 'PriceList') {
          // Do some interesting stuff here

        } else if (page === 'Reservation') {
          
        } else if ( page === 'AddReview') {
          console.log('backed',dismissData);
          this.getUserInfo(dismissData);
          this.getUserInfoRating(dismissData);

        } else if (page === 'GetLocation') {

        } else if (page === 'WorkTime') {
          console.log('dismissData',dismissData);
          if(dismissData){
            this.userData.userWorkTimes = dismissData;
          }
          
        }

      })
    } else {
      this.navCtrl.push(page,{pageData:{user_id:this.userLocal.id,provider_id:this.pageParams.id}})
    }
  }
  
  MessagesDetail(pageData) {
    let MessagesDetailModal = this.modalCtrl.create('MessagesDetail',{pageData});
    MessagesDetailModal.present();
    MessagesDetailModal.onDidDismiss(data => {
        // Saving this info to local storage after updating user profile info
    })
  
  }

  
}
