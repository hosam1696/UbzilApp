import {AppUtilFunctions} from './../../app/appglobal/app.utilfuns';
// Main Components
import {Component} from '@angular/core';
import {ActionSheetController, Events, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class Settings {

  titletext: any;
  canceltext: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              public appUtils: AppUtilFunctions,
              public actionSheetCtrl: ActionSheetController,
              public modalCtrl: ModalController) {
    this.titletext = 'اختر اللغة';
    this.canceltext = 'الغاء';
  }

  ionViewDidEnter() {


  }

  ionViewDidLoad() {
    // Run After Page Already Loaded
    console.log(decodeURI(location.href).split('/').splice(5) + ' component');
    console.info('The current Lang we are using is', this.appUtils.CurrentLang);

    //this.appUtils.AppToast('Your current Lang is ' + this.appUtils.CurrentLang, {duration:500});


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

    this.events.subscribe('lang:Changed', (lang) => {
      if (lang == 'ar') {
        this.titletext = 'اختر اللغة';
        this.canceltext = 'الغاء';

      } else {
        this.titletext = 'Choose Language';
        this.canceltext = 'Cancel';
      }
      this.appUtils.translate.use(lang);

    });


    let actionSheet = this.actionSheetCtrl.create({
      title: this.titletext,
      buttons: [
        {
          text: 'عربي',
          handler: () => {
            this.events.publish('lang:Changed', ('ar'));
          }
        },
        {
          text: 'English',
          handler: () => {
            this.events.publish('lang:Changed', ('en'));
          }
        },
        {
          text: this.canceltext,
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
      this.navCtrl.push(page)
    }
  }


}
