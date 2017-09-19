// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, ViewController, NavParams, Events, ActionSheetController, ToastController} from 'ionic-angular';
import {TranslateService} from 'ng2-translate';

// Providers

// Req Pages


@IonicPage()
@Component({
    selector: 'page-reservation',
    templateUrl: 'reservation.html',
})
export class Reservation {
    closetext:any;
    toasttext:any;
    

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public translate: TranslateService,
        public events: Events,
        public actionSheetCtrl: ActionSheetController,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController
    ) {
    }

    ionViewDidEnter() {
        // Run After Page Already Entered

    }

    ionViewDidLoad() {
        // Run After Page Already Loaded

        this.translate.get('book-date')
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

    BookDate() {
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

