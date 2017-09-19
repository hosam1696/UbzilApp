import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams, Events, ActionSheetController} from 'ionic-angular';
import {TranslateService} from 'ng2-translate';


@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html',
})
export class Settings {

    name: any;
    mail: any;
    uid: any;
    role: any;
    Token: any;

    titletext: any
    canceltext: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public globFuns: AppUtilFunctions,
        public actionSheetCtrl: ActionSheetController,
        public translate: TranslateService,
        public modalCtrl: ModalController
    ) {
        this.titletext = 'اختر اللغة';
        this.canceltext = 'الغاء';
    }

    ionViewDidEnter() {

       
    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
        console.log(decodeURI(location.href).split('/').splice(4));
        console.info('The current Lang we are using is', this.translate.getLangs(),this.translate.currentLang)

        this.globFuns.AppToast('Your current Lang is '+this.globFuns.CurrentLang)

        console.warn(this.globFuns.getLangValue('language'));

        this.translate.get('language')
            .subscribe(val=> {
                console.warn('your val is', val);
            })
  
    }

    Logout() {
        this.events.publish('user:Logout', this.Token);
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
            this.translate.use(lang);
            
            
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

    protected navigateTo(page:string, isModal:boolean = false, pageData?:any):void {
        if (isModal) {
            let EditProfileModal = this.modalCtrl.create(page,{pageData});
            EditProfileModal.present();
            EditProfileModal.onDidDismiss(data => {
                // Saving this info to local storage after updating user profile info
            })
        } else {
            this.navCtrl.push(page)
        }
    }



}
