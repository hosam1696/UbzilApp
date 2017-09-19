// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ViewController, NavParams, ToastController} from 'ionic-angular';
import {TranslateService} from 'ng2-translate';

// Providers

// Req Pages

@IonicPage()
@Component({
    selector: 'page-confirm-reservation',
    templateUrl: 'confirm-reservation.html',
})
export class ConfirmReservation {

    uid: any;
    mestitle: any;
    mesbody: any;
    closetext: any;
    toasttext: any;


    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public translate: TranslateService,
        private toastCtrl: ToastController,
    ) {
        this.uid = navParams.get('userId');
    }

    ionViewDidEnter() {
        // Run After Page Already Entered
    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
        this.translate.get('Message-sent-successfully')
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

    Send() {
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
