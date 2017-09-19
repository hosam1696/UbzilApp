// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams, Events, ActionSheetController} from 'ionic-angular';
import {TranslateService} from 'ng2-translate';

// Providers


// Req Pages
import {Contactus} from "../contactus/contactus";
import {ProfilePage} from "../profile/profile";
//import {Notifications} from "../notifications/notifications";
import {EditProfile} from "../edit-profile/edit-profile";
import {MyBalance} from "../my-balance/my-balance";
import {ReservationsList} from "../reservations-list/reservations-list";

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
        public actionSheetCtrl: ActionSheetController,
        public translate: TranslateService,
        public modalCtrl: ModalController
    ) {
        this.titletext = 'اختر اللغة';
        this.canceltext = 'الغاء';
    }

    ionViewDidEnter() {

        // Run After Page Already Entered
        //    Promise.all([
        //      this.users.getUserInfo(),
        //      this.users.getToken()
        //    ]).then((data) => {
        //      console.log(data);
        //      this.Token = data[0].token;
        //      this.name = data[0].user.name;
        //      this.uid = data[0].user.uid;
        //      this.mail = data[0].user.mail
        //      if (data[0].rid == 4) this.role = 'Transporter';
        //      else if (data[0].rid == 5) this.role = 'Passenger';
        //    })
    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
  
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
        
//        setTimeout(()=>{
//            this.translate.get('language')
//                .subscribe(lang=>{
//                    console.log(lang)
//                })
//            },2000)
    }

    contactus() {
        let ContactusModal = this.modalCtrl.create(Contactus, {uid: this.uid});
        ContactusModal.present();
        ContactusModal.onDidDismiss(data => {
            console.log(data);
        });
    }

    goProfile() {
        this.navCtrl.push(ProfilePage);
    }
//    goNotifications() {
//        this.navCtrl.push(Notifications);
//    }
    goMyBalance() {
        this.navCtrl.push(MyBalance);
    }
    goReservationsList() {
        this.navCtrl.push(ReservationsList);
    }
    goEditProfile() {
        let EditProfileModal = this.modalCtrl.create(EditProfile);
        EditProfileModal.present();
        EditProfileModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })
    }

}
