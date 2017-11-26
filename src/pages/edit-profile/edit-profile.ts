// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, ViewController, NavParams, Events, ActionSheetController, ToastController} from 'ionic-angular';
import {TranslateService} from 'ng2-translate';

// Providers
import {GetLocation} from "../get-location/get-location";
// Req Pages


@IonicPage()
@Component({
    selector: 'page-edit-profile',
    templateUrl: 'edit-profile.html',
})
export class EditProfile {
    phonenum: any[];
    Citys: any[];
    workplace: any[];
    Districts: any[];
    public phone: string;
    District: any;
    closetext: any;
    toasttext: any;

    Governorate: any;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public events: Events,
        public translate: TranslateService,
        private toastCtrl: ToastController,
        public actionSheetCtrl: ActionSheetController,
        public modalCtrl: ModalController    ) {
        this.phonenum = this.navParams.get('TelList');
        for (let i in this.phonenum) {
            console.log("number is " + this.phonenum[i].number);
        }

        console.log(this.phonenum);
        this.Citys = [
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
        ];

        this.District = this.Districts[0].id;
        this.Governorate = this.Citys[0].id;
    }

    ionViewDidEnter() {
        // Run After Page Already Entered

    }

    ionViewDidLoad() {
        this.translate.get('Changes-saved')
            .subscribe(lang => {
                this.toasttext = lang;
            })
        this.translate.get('Close')
            .subscribe(lang => {
                this.closetext = lang;
            })
    }


    dismiss() {
        this.viewCtrl.dismiss();
    }

    moreworkplace(workplace) {
        var p = {"Governorate": this.Governorate, "districts": this.District};
        this.workplace.push(p);
        console.log("tis is array", this.workplace);
    }

    removeworkplace(x) {
        this.workplace.splice(x, 1);
    }


    //    changeImage() {
    //        let actionSheet = this.actionSheetCtrl.create({
    //            title: 'Upload Image',
    //            buttons: [
    //                {
    //                    icon: 'folder',
    //                    text: 'From file',
    //                    handler: () => {
    //                        console.log('Destructive clicked');
    //                    }
    //                }, {
    //                    icon: 'camera',
    //                    text: 'From camera',
    //                    handler: () => {
    //                        console.log('Archive clicked');
    //                    }
    //                }, {
    //                    text: 'cancel',
    //                    role: 'cancel',
    //                    handler: () => {
    //                        console.log('Cancel clicked');
    //                    }
    //                }
    //            ]
    //        });
    //        actionSheet.present();
    //    }


    locationmodal() {
        let getlocationModal = this.modalCtrl.create(GetLocation);
        getlocationModal.present();
        getlocationModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })
    }
    addmore(phonenum) {
        var p = {"number": this.phone};
        this.phonenum.push(p);
        console.log("tis is array", this.phonenum);
    }

    remove(i) {
        this.phonenum.splice(i, 1);
    }
    SaveChanges() {
        this.dismiss();
        let toast = this.toastCtrl.create({
            message: this.toasttext,
            position: "middle",
            showCloseButton: true,
            closeButtonText: this.closetext,
            duration: 3000
        });
        toast.present();
    }

}
