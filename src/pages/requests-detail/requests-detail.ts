import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams, Events, ActionSheetController, ToastController, AlertController} from 'ionic-angular';
import {TranslateService} from 'ng2-translate';
import { Http } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
// Providers
import { ProjectsProvider} from './../../providers/projects/project';


// Req Pages
import {ApplyJop} from "../applyjop/applyjop";
import {GetLocation} from "../get-location/get-location";
import {MessagesDetail} from '../messages-detail/messages-detail';
import {ProfilePage} from '../profile/profile';


@IonicPage()
@Component({
    selector: 'page-requests-detail',
    templateUrl: 'requests-detail.html',
})
export class RequestsDetail {
    myRequests: any;
    closetext:any;
    toasttext:any;
    isRTL: boolean;
    //
    userLocal:any;
    showLoader: boolean = true;
    pageParams: any;
    orderDetails: any;
    alertTitle:string;
    alertSubTitle:string;
    alertAccept:string;
    alertRefuse:string;
    choosed:string;
    showapplicants: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public modalCtrl: ModalController,
        public appUtils: AppUtilFunctions,
        public projectsProvider: ProjectsProvider,
        public translateService: TranslateService,
        public http: Http,
        public inappbrowser: InAppBrowser,
        public alertCtrl: AlertController
    ) {
        console.log('*************** RequestsDetail ******************');
        this.pageParams = this.navParams.get('pageData');
        console.log('pageParams >>> ', this.pageParams);
        this.myRequests = "mine";
    }

    ionViewDidEnter() {
        // Run After Page Already Entered
        this.isRTL = this.appUtils.isRTL
    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
        this.translateService.get('choosed')
        .subscribe(data => {
            this.choosed = data;
        })

        this.appUtils.storage.get('localUserInfo')
        .then((data)=>{
          this.userLocal = data;
          console.log('localUserInfo in RequestsDetail', this.userLocal);
          this.getProjectDetails(this.pageParams.order_id);
        })
    }

    // TODO: Get User Data IF who login Open other user profile
    getProjectDetails(orderId){
        let sentData ={
        'order_id':orderId,            
        "user_id": this.userLocal.id,
        "verifycode": this.userLocal.verifycode,
        "lang_code": this.appUtils.CurrentLang,
        };
        this.projectsProvider.getProjectDetails(sentData).subscribe((data) => {
            console.log('orderDetails from server in RequestsDetail', data);
            if (data) {
                this.orderDetails = data;
                if(this.orderDetails.latitude){
                    this.getMapAddress(this.orderDetails.latitude, this.orderDetails.longitude);
                }else{
                    this.translateService.get('no_google_map')
                    .subscribe(value => {this.orderDetails.MreqAddress = value});
                }
                
            } else {
              console.warn('somthing went wrong when getting Project Details')
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
            console.log(this.orderDetails.order_applicants.length);
            this.orderDetails.order_applicants_length = this.orderDetails.order_applicants.length;
            if (this.orderDetails.order_applicants.length > 0) {
                this.showapplicants = true;
            }
        })
    }

    // TODO: Get map address using lon and lat
    getMapAddress(latitude, longitude) {
    
        let geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&key=AIzaSyBL9-cIsQpwffcZ5NCHEuHilTG_7sEhSXg';
        this.http.get(geocodeUrl)
        .map(res=>res.json())
        .pluck('results')
        .subscribe(result=>{
            console.log('response from geocoding', result[0].formatted_address);
            this.orderDetails.MreqAddress = result[0].formatted_address;
        },err=> {
            console.warn(err);
        })
    }

    // TODO: Open map using lon and lat in browser
    openBrowserMap(maps = '') {
        if (this.orderDetails.latitude && this.orderDetails.longitude) {
          maps = this.orderDetails.latitude + ','+this.orderDetails.longitude;
          console.info(maps);
          const url = 'https://www.google.com/maps?q=' + maps + '&z=17&hl=ar';
          const tab = this.inappbrowser.create(url);
      
          tab.show();
        }else{
          this.translateService.get('no_google_map')
          .subscribe( value => {this.appUtils.AppToast(value)})
        }
    }
    
    imagePath(img) {
        return this.appUtils.UPLOAD_FOLDER+img
    }

    navToAddOffer(page: string, pageData?: any): void {
        if(this.orderDetails.order_applicants_length < this.orderDetails.ser_allow_number){
            let found = this.orderDetails.order_applicants.find(myObj => myObj.provider_id === this.userLocal.id);
            if (found) {
                console.log('founded', found);
                this.translateService.get('plz_added_offer_before')
                .subscribe( value => {this.appUtils.AppToast(value)})
            }else{
                let addOfferModal = this.modalCtrl.create(page, { pageData });
                addOfferModal.present();
                addOfferModal.onDidDismiss(dismissData => {
                    if(dismissData){
                        this.orderDetails.order_applicants = (this.orderDetails.order_applicants instanceof Array) ? this.orderDetails.order_applicants : [];
                        
                        console.log('this.orderDetails.order_applicants 1',this.orderDetails.order_applicants);
                        this.orderDetails.order_applicants.unshift(dismissData) ;
                        this.orderDetails.applicants_count++ ;
                        this.showapplicants = true;
                    }
                    
                })
            }
            
        }else{
            this.translateService.get('plz_allowed_applicant_num')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }
    }

    navigateTo(page: string, isModal: boolean = false, pageData?: any): void {
        if (isModal) {
            let EditProfileModal = this.modalCtrl.create(page, { pageData });
            EditProfileModal.present();
            EditProfileModal.onDidDismiss(dismissData => {
                // Saving this info to local storage after updating user profile info

                if (page === 'EditProfile') {
                    // Do some interesting stuff here

                } else if (page === 'Contactus') {
                    // Do some interesting stuff here

                }

            })
        } else {
            console.log('in navigate to ', pageData)
            this.navCtrl.push(page,{pageData})
        }
    }

    confirmAlert(orderId,fullName,providerId){        
        this.translateService.get('warning')
        .subscribe(value => {this.alertTitle = value});

        this.translateService.get('confirm_choose_me')
        .subscribe(value => {this.alertSubTitle = value});

        this.translateService.get('Accept')
        .subscribe(value => {this.alertAccept = value});

        this.translateService.get('Refuse')
        .subscribe(value => {this.alertRefuse = value});

        let alert = this.alertCtrl.create({
            title: fullName,
            subTitle: this.alertSubTitle,
            buttons:[
                {
                    text: this.alertAccept,
                    handler: ()=>{
                        console.log("accepted Clicked order_id",orderId, providerId);
                        this.chooseProvider(orderId,providerId);
                        
                    }
                },
                {
                    text: this.alertRefuse,
                    handler: () => {
                        console.log("refuse Clicked",this.orderDetails);
                    }
                }
            ]
        });
        alert.present();
    }

    // TODO: Get User Data IF who login Open other user profile
    chooseProvider(orderId,providerId){
        let sentData ={
        'order_id':orderId,
        "provider_id": providerId,
        'backed_cost':this.orderDetails.backed_cost,            
        "user_id": this.userLocal.id,
        "verifycode": this.userLocal.verifycode,
        "lang_code": this.appUtils.CurrentLang,
        };
        this.projectsProvider.chooseProvider(sentData).subscribe((data) => {
            console.log('chooseProvider from server in RequestsDetail', data);
            if (data) {
                this.orderDetails.provider_id = providerId;
                //this.getProjectDetails(orderId);
            } else {
              console.warn('somthing went wrong when getting Project Details')
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
}
