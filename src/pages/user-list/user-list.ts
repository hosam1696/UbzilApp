import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
import { ServicesProvider } from './../../providers/services/services';
// Main Components
import {Component} from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, Events, ActionSheetController, PopoverController } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'page-user-list',
    templateUrl: 'user-list.html',
})
export class UserList {
    providers: any[];
    pageParams: any;
    ubzilLoader: boolean = true;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public actionSheetCtrl: ActionSheetController,
        public modalCtrl: ModalController,
        public appUtils: AppUtilFunctions,
        public services: ServicesProvider,
        public popoverCtrl: PopoverController
    ) {

        this.pageParams = this.navParams.get('pageData');

        console.log('page params from gmaps', this.pageParams);
    }

    ionViewDidEnter() {
        // Run After Page Already Entered

        //{ "user_id":"3", "service_id":"145", "latitude":"32.215489", "longitude":"35.369852", "verifycode":"$2y$12$XQBdOjshGvoSRcT6uTlJaOkOiV.htMTyyT09IXxdjHrSQeoc/vgkO", "lang_code":"ar" }
    }

    ionViewDidLoad() {
        // Run After Page Already Loaded

        this.services.getServiceProviders(
            {
                "user_id": "3",
                "verifycode": "$2y$12$XQBdOjshGvoSRcT6uTlJaOkOiV.htMTyyT09IXxdjHrSQeoc/vgkO",
                "service_id": this.pageParams.service_id,
                "latitude": this.pageParams.lat,
                "longitude": this.pageParams.lng,
                "lang_code": this.appUtils.CurrentLang
            }).subscribe(({ status ,error, data }) => {
                
                if (status === 'success') {
                    console.log('service providers', data);
                    this.providers = data
                } else {
                    this.appUtils.AppToast(this.appUtils.CurrentLang =='ar'?error:'no providers for this service',  {position:'bottom'}, this.popPage);
                    console.warn(error)
                }
                
            }, err => {
                this.ubzilLoader = false;
                if (err.error instanceof Error) {
                    console.warn('client side errror', err)
                } else {
                    console.warn('server side error', err)
                }
            }, () => {
                this.ubzilLoader = false
            })
    }
    goProfilePage(){
        this.navCtrl.push('ProfilePage');
    }

    private popPage = () => this.navCtrl.pop();

      addreviewmodal() {
        let addreviewmodal = this.modalCtrl.create('AddReview');
        addreviewmodal.present();
        addreviewmodal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })
    }
        MessagesDetail() {
        let MessagesDetailModal = this.modalCtrl.create('MessagesDetail');
        MessagesDetailModal.present();
        MessagesDetailModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })

    }
        openPopover(myEvent, mobile) {
            let popover = this.popoverCtrl.create('PopoverContentPage', { TellList:[mobile]});
        popover.present({
            ev: myEvent
        });
    }



}
