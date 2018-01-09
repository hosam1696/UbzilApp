import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {Ionic2RatingModule} from 'ionic2-rating';
import {TranslateService} from 'ng2-translate';


// Providers
import { UserProvider } from './../../providers/user/user';

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
    pageParams:any;
    rate:any;
    rateMsg:any;
    editRate:boolean = false;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public translateService: TranslateService,
        private toastCtrl: ToastController,
        public RatingModule: Ionic2RatingModule,
        public appUtils: AppUtilFunctions,
        public userProvider: UserProvider,

    ) {
        console.log('*************** AddReview ******************');
        this.pageParams = this.navParams.get('pageData');
        console.log('pageParams in  AddReview', this.pageParams);
    }



    ionViewDidEnter() {
        // Run After Page Already Entered
    }

    ionViewDidLoad() {
        this.translateService.get('your-review-added')
            .subscribe(lang => {
                this.toasttext = lang;
            })
        this.translateService.get('Close')
            .subscribe(lang => {
                this.closetext = lang;
            })

        this.getRating();

    }

    dismiss(id) {
        this.viewCtrl.dismiss(id);
    }

    getRating() {
        let sendData = {
            'user_id' :this.pageParams.user_id,
            'provider_id' :this.pageParams.provider_id,
            }    
        this.userProvider
        .getRating(sendData)
        .subscribe((data)=> {
            if (data) {
                console.log(data);
                this.editRate = true;
                this.rate    = data.rating_value;
                this.rateMsg = data.rating_message;
            }
            },
            err => {
            if (err.error instanceof Error) {
                console.warn('client side error', err)
            } else {
                console.warn('server side error', err);
                }
            },
            () => {
            }
        
        );
    }

    AddRating() {
        console.log('rate will send to server',this.rate);
        if(!this.rate){
            this.translateService.get('old_password_required')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else{
            let rateData = {
                'user_id' :this.pageParams.user_id,
                'provider_id' :this.pageParams.provider_id,
                'rating_message' :this.rateMsg,
                'question_id' :'4',
                'rating_value' :this.rate,
              }    
            this.userProvider
            .addRating(rateData)
            .subscribe((data)=> {
                if (data) {
                    this.dismiss(this.pageParams.provider_id);
                    let toast = this.toastCtrl.create({
                        message: this.toasttext,
                        position: "middle",
                        showCloseButton: true,
                        closeButtonText: this.closetext,
                        duration: 3000
                    });
                    toast.present();
                }
              },
              err => {
                if (err.error instanceof Error) {
                    console.warn('client side error', err)
                } else {
                  console.warn('server side error', err);
                  }
              },
              () => {
              }
            
            );
        }
    }

    onModelChange(val) {
        console.log('Val changed val',val);
        console.log('Val changed user_id',this.pageParams.user_id);
        console.log('Val changed provider_id',this.pageParams.provider_id);
    }
}
