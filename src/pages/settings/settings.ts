import {AppUtilFunctions} from './../../app/appglobal/app.utilfuns';
// Main Components
import {Component} from '@angular/core';
import { ActionSheetController, Events, IonicPage, ModalController, NavController, Platform } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class Settings {

  titletext: any;
  canceltext: any;
  isRTL: boolean;
  userLocal:any;
  showLoader: boolean = true;
  constructor(public navCtrl: NavController,
              public events: Events,
              public appUtils: AppUtilFunctions,
              public actionSheetCtrl: ActionSheetController,
              public modalCtrl: ModalController) {
    this.titletext = 'اختر اللغة';
    this.canceltext = 'الغاء';
  }

  ionViewDidEnter() {

    this.isRTL = this.appUtils.isRTL

    console.log('platform right to left', this.isRTL)

  }

  ionViewDidLoad() {
    // Run After Page Already Loaded
    console.log(decodeURI(location.href).split('/').splice(5) + ' component');
    console.info('The current Lang we are using is', this.appUtils.CurrentLang);

    //this.appUtils.AppToast('Your current Lang is ' + this.appUtils.CurrentLang, {duration:500});
    this.appUtils.storage.get('localUserInfo')
    .then(data=>{
        this.userLocal = data;
        this.showLoader = false;
        console.log('localUserInfo in Settings',this.userLocal);
    });

    try {
      this.appUtils.getLangValue('language')
        .then(val => {
          console.warn('getting translate value of (language)', val);
        })
    } catch (e) {
      console.error(new Error('translate service has encountered an error'));
    }

  }


  changeLang() {

    this.titletext = this.appUtils.CurrentLang == 'en' ? 'Choose a language' : 'اختر اللغة';


    let actionSheet = this.actionSheetCtrl.create({
      title: this.titletext,
      buttons: [
        {
          text: 'العربية',
          handler: () => {
            this.events.publish('lang:Changed', ('ar'));
            this.isRTL = this.appUtils.isRTL
          }
        },
        {
          text: 'English US',
          handler: () => {
            this.events.publish('lang:Changed', ('en'));
            this.isRTL = this.appUtils.isRTL
          }
        },
        {
          text: this.isRTL?'الغاء':'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();

  }

  protected navigateTo(page: string, isModal: boolean = false, pageData?: any): void {
    if (isModal) {
      let EditProfileModal = this.modalCtrl.create(page, {pageData});
      EditProfileModal.present();
      EditProfileModal.onDidDismiss(dismissData => {
        // Saving this info to local storage after updating user profile info

        if (page === 'EditProfile') {
          // Do some interesting stuff here

        } else if (page === 'Contactus') {
          // Do some interesting stuff here

        }

      })
    } else {
      if (page === 'ProfilePage') {
        this.navCtrl.push(page,{pageData:{id:this.userLocal.id}})
      }else{
        this.navCtrl.push(page)
      }
    }
  }

  Logout() {
    console.warn('you are attempting to log out');
    this.appUtils.storage.remove('localUserInfo')
    .then(() => {
      console.warn('removed');
      this.navCtrl.setRoot('Login')
    })
    /* .then(() => {
      this.navCtrl.setRoot('Login');
    }) */
  }


}
