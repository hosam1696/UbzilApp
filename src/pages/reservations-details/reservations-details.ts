import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
// Main Components
import {Component} from '@angular/core';
import {IonicPage, ViewController, NavParams} from 'ionic-angular';
import {TranslateService} from 'ng2-translate';
// Providers
import { UserProvider } from './../../providers/user/user';

// Req Pages


@IonicPage()
@Component({
    selector: 'page-reservation-details',
    templateUrl: 'reservations-details.html',
})
export class ReservationDetails {
    userLocal:any;
    showLoader: boolean = true;
    pageParams: any;
    bookingDetails: any;


    constructor(
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public appUtils: AppUtilFunctions,
        public translateService: TranslateService,
        public userProvider: UserProvider,
        
    ) {
        console.log('*************** ReservationDetails ******************');
        this.pageParams = this.navParams.get('pageData');
        console.log('pageParams >>> ', this.pageParams);
    }

    ionViewDidEnter() {
        // Run After Page Already Entered
    }

    ionViewDidLoad() {
        this.appUtils.storage.get('localUserInfo')
        .then((data)=>{
          this.userLocal = data;
          console.log('localUserInfo in ReservationDetails', this.userLocal);
          this.getBookingDetails(this.pageParams.booking_id);
        })
    }

    // TODO: Get booking Details
    getBookingDetails(bookingId){
        let sentData ={
            'id':bookingId,            
            //"user_id": this.userLocal.id,
            //"verifycode": this.userLocal.verifycode,
            //"lang_code": this.appUtils.CurrentLang,
        };
        this.userProvider.getBookingDetails(sentData).subscribe((data) => {
            console.log('bookingDetails from server in RequestsDetail', data);
            if (data) {
                this.bookingDetails = data;               
            }
        }, err => {
            this.showLoader = false;
            if (err.error instanceof Error) {
              console.warn('client side error', err);
            } else {
              console.warn('server side error', err);
            }
        }, () => {
            this.showLoader = false;
        })
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    
}
