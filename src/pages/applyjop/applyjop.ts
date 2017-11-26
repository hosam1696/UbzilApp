// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ViewController, NavParams, ToastController, Events} from 'ionic-angular';
import {TranslateService} from 'ng2-translate';

// Providers

// Req Pages

@IonicPage()
@Component({
    selector: 'page-applyjop',
    templateUrl: 'applyjop.html',
})
export class ApplyJop {

    uid: any;
    mestitle: any;
    mesbody: any;
    toasttext: any;
    closetext: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public events: Events,
        public translate: TranslateService,
        private toastCtrl: ToastController,
    ) {
        this.uid = navParams.get('userId');

    }

    ionViewDidEnter() {
    }

    ionViewDidLoad() {
        this.translate.get('Request-successfully')
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
