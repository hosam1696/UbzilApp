// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {Ionic2RatingModule} from 'ionic2-rating';
import {TranslateService} from 'ng2-translate';


// Providers

// Req Pages


@IonicPage()
@Component({
    selector: 'page-addreview',
    templateUrl: 'addreview.html',
})
export class AddReview {
    element: any;
    closetext: any;
    toasttext: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public translate: TranslateService,
        private toastCtrl: ToastController,
        public RatingModule: Ionic2RatingModule,


    ) {

    }



    ionViewDidEnter() {
        // Run After Page Already Entered
    }

    ionViewDidLoad() {
        this.translate.get('your-review-added')
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
    AddReview() {
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

  onModelChange(val) {
      console.log('Val changed',val);
  }
}
