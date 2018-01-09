// Main Components
import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController} from 'ionic-angular';
// Providers
import {TranslateService} from 'ng2-translate';
import { UserProvider } from './../../providers/user/user';

// Req Pages
import {AppUtilFunctions} from "../../app/appglobal/app.utilfuns";



@IonicPage()
@Component({
    selector: 'page-reservations-list',
    templateUrl: 'reservations-list.html',
})
export class ReservationsList {
    x = "true";
    closetext: any;
    toasttext: any;
    bookingType: string = 'bookIn';
    // for scroll 
    initLimit: number = 10;
    initStart: number = 0;
    moreData: boolean = true;
    pullingText:string;
    refreshingText:string;
    loadingText:string;
    //
    userLocal:any;
    showLoader: boolean = true;
    noData:boolean = false;
    inBookingData: any[];
    outBookingData: any[];
    constructor(
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public appUtils: AppUtilFunctions,
        public translateService: TranslateService,
        public userProvider: UserProvider,
    ) {
        console.log('*************** ReservationsList ******************');
        this.x = "true";
    }

    ionViewDidEnter() {
        // Run After Page Already Entered
        this.appUtils.storage.get('localUserInfo')
        .then((data)=>{
          this.userLocal = data;
          if (this.userLocal.account_type == 'finder') {
              this.bookingType = 'bookOut'
          }
          this.initStart = 0;
          console.log('start', this.initStart,'limit', this.initLimit);
          
          console.log('localUserInfo in ReservationsList', this.userLocal);
          this.getUserBooking(this.bookingType, this.initLimit, this.initStart);
        })
    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
        this.translateService.get('pullingText')
        .subscribe(value => {this.pullingText = value})
    
        this.translateService.get('refreshingText')
        .subscribe(value => {this.refreshingText = value})
    
        this.translateService.get('loadingText')
        .subscribe(value => {this.loadingText = value})
        this.appUtils.translate.get('reservations-accepted')
            .subscribe(lang => {
                this.toasttext = lang;
            })
        this.appUtils.translate.get('Close')
            .subscribe(lang => {
                this.closetext = lang;
            })
        
    }

    onSegmentChange(bookingType){
        console.log('onSegmentChange',bookingType);
        this.showLoader = true;
        this.initStart = 0;
        this.noData = false;
        this.moreData = true;
        this.getUserBooking(bookingType, this.initLimit, this.initStart);
    }
    // TODO: call it to access http service provider
    accessUserBooking(bookingType, limit?: number, start?: number){
        let sentData ={
            "user_id": this.userLocal.id,
            //"verifycode": this.userLocal.verifycode,
            //"lang_code": this.appUtils.CurrentLang,
            "bookingType": bookingType,
            "start":start,
            "limit":limit
            
        };
        return this.userProvider.getUserBooking(sentData);
    } 
    // TODO: Get User Data IF who login Open other user profile
    getUserBooking(bookingType, limit?: number, start?: number){
        this.accessUserBooking(bookingType, limit, start).subscribe((data) => {
            console.log('data from server in reservation list', data)
            if (data) {
                this.noData = false;
                if (bookingType == 'bookIn') {
                    console.log('inBookingData response',data);
                    this.inBookingData = data;
                }else{
                    console.log('outBookingData response',data);
                    this.outBookingData = data;
                }
                //(data.length >= this.initLimit) ? this.moreData = true : this.moreData = false;
            } else {
                console.warn('somthing went wrong when getting Projects')
                this.noData = true;
                console.log('noData', this.noData);
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
    
    // TODO: get more when go to bottom
    fetchMoreData(event,bookingType) {
        console.log(' there are more data ? ',this.moreData)
        if (this.moreData) {
            this.accessUserBooking(bookingType,this.initLimit, this.initStart += this.initLimit)
            .subscribe((data) => {
                if (data) {
                    console.log('this.initStart' , this.initStart, 'data.length' , data.length);
                    if (bookingType == 'bookIn') {
                        console.log('inBooking response data',data);
                        this.inBookingData = [...this.inBookingData, ...data];
                    }else{
                        console.log('outBookingData response data',data);
                        this.outBookingData = [...this.outBookingData, ...data];
                    }
        
                    (data.length >= this.initLimit) ? this.moreData = true : this.moreData = false;
    
                }else{
                    this.moreData = false;
                }
            },
            (err) => {
                event.complete();
                console.warn('error', err) // catch net error acceccsing database
            },
            () => {
                console.log('more data ? ',this.moreData)
                event.complete();
            }
            );
    
        } else {
            event.complete();
            console.log('there is no data');
            return false;
        }
    }

    // TODO: refresh list when go to top
    refreshBooking(event,bookingType) {
        this.initStart = 0;
        this.moreData = true;
        this.getUserBooking(bookingType, this.initLimit, this.initStart);
        console.log('refreshed ');
        event.complete();
    }

    goProfilePage(pageData) {
        this.navCtrl.push('ProfilePage',{pageData});
    }

    cancelBooking(bookingId,index){
        // cancel booking mean change status to 1 and hide from my out booking 
        console.log('bookingId', bookingId);
        let sentData ={
            "user_id": this.userLocal.id,
            "verifycode": this.userLocal.verifycode,
            "id":bookingId,
          };
          this.userProvider.cancelBooking(sentData).subscribe((data) => {
            if (data) {
              this.translateService.get('booking_successfully_canceled')
              .subscribe( value => {this.appUtils.AppToast(value)});
      
              this.outBookingData.splice(index, 1);
      
            }
        }, err => {
            if (err.error instanceof Error) {
              console.warn('client side error', err);
            } else {
              console.warn('server side error', err);
            }
        }, () => {})
    }

    deleteBooking(bookingId,index){
        // cancel booking mean change status to 1 and hide from my out booking 
        console.log('bookingId', bookingId);
        let sentData ={
            "user_id": this.userLocal.id,
            "verifycode": this.userLocal.verifycode,
            "id":bookingId,
          };
          this.userProvider.deleteBooking(sentData).subscribe((data) => {
            if (data) {
              this.translateService.get('booking_successfully_deleted')
              .subscribe( value => {this.appUtils.AppToast(value)});
      
              this.inBookingData.splice(index, 1);
      
            }
        }, err => {
            if (err.error instanceof Error) {
              console.warn('client side error', err);
            } else {
              console.warn('server side error', err);
            }
        }, () => {})
    }

    /* reservationMsgmodal() {
        let ConfirmReservationModal = this.modalCtrl.create('ConfirmReservation');
        ConfirmReservationModal.present();
        ConfirmReservationModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })
    }

    accepted() {

      this.appUtils.AppToast(this.toasttext,
        {position: "middle",
        showCloseButton: true,
        closeButtonText: this.closetext,
        duration: 3000});
    }


    sendReservationStatus(accept:boolean= false):void {
        accept?this.accepted():this.reservationMsgmodal()
    } */

    imagePath(img) {
        return this.appUtils.UPLOAD_FOLDER+img
    }
    protected navigateTo(page: string, isModal: boolean = false, pageData?: any): void {
        if (isModal) {
          let EditProfileModal = this.modalCtrl.create(page, {pageData});
          EditProfileModal.present();
          EditProfileModal.onDidDismiss(dismissData => {    
            if (page === 'EditProfile') {
              // Do some interesting stuff here
            }
    
          })
        } else {
          console.log('in navigate to ', pageData)
          this.navCtrl.push(page,{pageData})
        }
      }

}
