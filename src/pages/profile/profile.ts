import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
// Main Components
import {Component} from '@angular/core';
import {
  ActionSheetController,
  Events,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  PopoverController
} from 'ionic-angular';
// Providers
import {TranslateService} from 'ng2-translate';
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
  constructor(public navCtrl: NavController,
              public events: Events,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public translate: TranslateService,
              public actionSheetCtrl: ActionSheetController,
              public popoverCtrl: PopoverController,
              public appUtils: AppUtilFunctions,
              public appPlugins: AppPlugins) {
    this.priceList = [
      {"id": 0, "name": "أشعة مقطعية", "price": "250"},
      {"id": 1, "name": "صورة دم كاملة", "price": "50"},
      {"id": 2, "name": "صورة دم ", "price": "110"}
    ];
    this.TelList = [
      {"id": 0, "number": "01028345565"},
      {"id": 1, "number": "01201750134"},
      {"id": 2, "number": "01221465858"}
    ];

    this.currentLang = this.appUtils.CurrentLang;

  }

  static ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

  }


  imageActionSheet() {
    this.translate.get('Upload-Image')
      .subscribe(lang => {
        this.titletext = lang;
      })
    this.translate.get('From-file')
      .subscribe(lang => {
        this.foldertext = lang;
      })
    this.translate.get('From-camera')
      .subscribe(lang => {
        this.cameratext = lang;
      })
    this.translate.get('Cancel')
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

  openPopover(myEvent) {
    let popover = this.popoverCtrl.create('PopoverContentPage', {TelList: this.TelList});
    popover.present({
      ev: myEvent
    });
  }

  protected navigateTo(page: string, isModal: boolean = false, pageData?: any): void {
    if (isModal) {
      let EditProfileModal = this.modalCtrl.create(page, {pageData});
      EditProfileModal.present();
      EditProfileModal.onDidDismiss(dismissData => {

        if (page === 'EditProfile') {
          // Do some interesting stuff here

        } else if (page === 'PriceList') {
          // Do some interesting stuff here

        } else if (page === 'Reservation') {


        } else if ( page === 'AddReview') {


        } else if (page === 'GetLocation') {


        } else if (page === 'WorkTime') {

        }

      })
    } else {
      this.navCtrl.push(page)
    }
  }

}
