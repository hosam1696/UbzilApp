import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
import { ServicesProvider } from './../../providers/services/services';
// Main Components
import {Component} from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, Events, ActionSheetController, PopoverController } from 'ionic-angular';
import {TranslateService} from 'ng2-translate';
import {GetLocation} from "../get-location/get-location";

@IonicPage()
@Component({
    selector: 'page-user-list',
    templateUrl: 'user-list.html',
})
export class UserList {
    providers: any[];
    pageParams: any;
    loader: boolean = true;
    userLocal:any;
    noData:boolean = false;
    initLimit: number = 15;
    initStart: number = 0;
    moreData: boolean = true;
    pullingText:string;
    refreshingText:string;
    loadingText:string;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public actionSheetCtrl: ActionSheetController,
        public modalCtrl: ModalController,
        public appUtils: AppUtilFunctions,
        public services: ServicesProvider,
        public popoverCtrl: PopoverController,
        public translateService: TranslateService,
    ) {
        console.log('********************** UserList *********************');
        this.pageParams = this.navParams.get('pageData');
        console.log('page params from SubCategory', this.pageParams);
    }

    ionViewDidEnter() {
        // Run After Page Already Entered
    }

    ionViewDidLoad() {
        this.translateService.get('pullingText')
        .subscribe(value => {this.pullingText = value})

        this.translateService.get('refreshingText')
        .subscribe(value => {this.refreshingText = value})

        this.translateService.get('loadingText')
        .subscribe(value => {this.loadingText = value})
        
        // Run After Page Already Loaded
        this.appUtils.storage.get('localUserInfo')
        .then(data=>{
            this.userLocal = data;
            this.fetchServiceProviders( this.initLimit, this.initStart);
        }); 
        
    }

    // TODO: get providers list for first time when open this page
    fetchServiceProviders(limit?: number, start?: number){
        this.getServiceProviders(limit, start).subscribe((data) => {
            if (data) {
                console.log('service providers', data);
                this.providers = data;
            } else {
                this.noData = true;
                console.log(this.noData);
            }
            
        }, err => {
            this.loader = false;
            if (err.error instanceof Error) {
                console.warn('client side errror', err)
            } else {
                console.warn('server side error', err)
            }
        }, () => {
            this.loader = false
        })
    }
    
    // TODO: get more providers list when go to bottom
    fetchMoreData(event) {
        console.log(' there are more data ? ',this.moreData)
        if (this.moreData) {
          this.getServiceProviders(this.initLimit, this.initStart += this.initLimit)
            .subscribe((data) => {
              if (data) {
                console.log('this.initStart' , this.initStart);
                console.log('data.length' , data.length);
                this.providers = [...this.providers, ...data]; //es6 destruction : concat data to the providers array  
                console.log('service providers', this.providers);
                if (data.length >= this.initLimit){
                  this.moreData = true;
                }else{
                  this.moreData = false;
                }
              }else{
                this.moreData = false;
              }
            },
            (err) => {
              event.complete();
              console.warn('error', err) // catch net error acceccsing database
            },
            () => {
              event.complete();
            }
    
            );
    
        } else {
          event.complete();
          console.log('there is no data');
          return false;
        }
    }
    
    // TODO: refresh providers list when go to top
    refreshProviders(event) {
        this.initStart = 0;
        this.getServiceProviders(this.initLimit, this.initStart)
          .subscribe(( data) => {
            if (data) {
              this.providers = data;
            }
          },
          err => {
            event.complete();
            //this.showLoader = false;
            console.warn(err) // catch fetching from the server
          },
          () => {
            event.complete();
            [this.moreData, this.loader] = [true, false]
          }
          )
        console.log('fetched ');
    }

    // TODO: call it to access http service provider 
    getServiceProviders(limit: number = this.initLimit, start: number = this.initStart){
        return this.services.getServiceProviders(
        {
            "user_id": this.userLocal.id,
            "verifycode": this.userLocal.verifycode,
            "service_id": this.pageParams.id,
            "latitude": this.pageParams.latitude,
            "longitude": this.pageParams.longitude,
            "lang_code": this.appUtils.CurrentLang,
            "start": start,
            "limit": limit
        });
    }

    // TODO: set image path uploade
    imagePath(img) {
        return this.appUtils.UPLOAD_FOLDER+'avatars/'+img
    }
    
    // TODO: open phone worlk list popover
    openPopover(myEvent, mobile) {
        let popover = this.popoverCtrl.create('PopoverContentPage', { TellList:mobile});
        popover.present({
            ev: myEvent
        });
    }
    
    // TODO: Go To show profile page of providers
    goProfilePage(id){
        this.navCtrl.push('ProfilePage',{pageData:{id:id}});
    }

    private popPage = () => this.navCtrl.pop();

    addreviewmodal() {
        let addreviewmodal = this.modalCtrl.create('AddReview');
        addreviewmodal.present();
        addreviewmodal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })
    }

    MessagesDetail(pageData) {
        let MessagesDetailModal = this.modalCtrl.create('MessagesDetail',{pageData});
        MessagesDetailModal.present();
        MessagesDetailModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })

    }

}
