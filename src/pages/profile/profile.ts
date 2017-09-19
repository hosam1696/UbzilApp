// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, ActionSheetController, Events, NavParams, PopoverController} from 'ionic-angular';
// Providers
import {TranslateService} from 'ng2-translate';


// Req Pages
import {EditProfile} from "../edit-profile/edit-profile";
import {GetLocation} from "../get-location/get-location";
import {AddReview} from '../addreview/addreview';
import {WorkTime} from '../work-time/work-time';
import {PopoverContentPage} from '../popover/popover';
import {MessagesDetail} from '../messages-detail/messages-detail';
import {Reservation} from '../reservation/reservation';
import {PriceList} from '../price-list/price-list';

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

    constructor(
        public navCtrl: NavController,
        public events: Events,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        public translate: TranslateService,
        public actionSheetCtrl: ActionSheetController,
        public popoverCtrl: PopoverController
    ) {
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

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProfilePage');
        
    }



    MessagesDetail() {
        let MessagesDetailModal = this.modalCtrl.create(MessagesDetail);
        MessagesDetailModal.present();
        MessagesDetailModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })

    }
    Reservationmodal() {
        let ReservationModal = this.modalCtrl.create(Reservation);
        ReservationModal.present();
        ReservationModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })

    }

    PriceListmodal() {
        let PriceListModal = this.modalCtrl.create(PriceList, {priceList: this.priceList});
        PriceListModal.present();
        PriceListModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
            console.log('data frommodal', data);
        })

    }



    goEditProfile() {
        let EditProfileModal = this.modalCtrl.create(EditProfile, {TelList: this.TelList});
        EditProfileModal.present();
        EditProfileModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })
    }
    goWorkTime() {
        let WorkTimeModal = this.modalCtrl.create(WorkTime);
        WorkTimeModal.present();
        WorkTimeModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })
    }

    locationmodal() {
        let getlocationModal = this.modalCtrl.create(GetLocation);
        getlocationModal.present();
        getlocationModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })
    }
    addreviewmodal() {
        let addreviewmodal = this.modalCtrl.create(AddReview);
        addreviewmodal.present();
        addreviewmodal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })
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
            title: this.titletext,
            buttons: [
                {
                    icon: 'folder',
                    text: this.foldertext,
                    handler: () => {
                        console.log('Destructive clicked');
                    }
                }, {
                    icon: 'camera',
                    text: this.cameratext,
                    handler: () => {
                        console.log('Archive clicked');
                    }
                }, {
                    text: this.canceltext,
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        })
        imageactionSheet.present();

    }


    openPopover(myEvent) {
        let popover = this.popoverCtrl.create(PopoverContentPage, {TelList: this.TelList});
        popover.present({
            ev: myEvent
        });
    }

}
