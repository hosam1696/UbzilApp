import { ServicesProvider } from './../../providers/services/services';
import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
// Main Components
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';

// Providers
// Req Pages
import { UserList } from '../user-list/user-list';
import { AddRequest } from '../add-request/add-request';
import { SearchService } from '../search-service/search-service';
// for select map values (lat , lon)
//import {GetLocation} from "../get-location/get-location";

@IonicPage()
@Component({
    selector: 'page-subcategory',
    templateUrl: 'subcategory.html',
})
export class SubCategory {

    searchQuery: string = '';
    items: any[];
    pageData: any;
    public sec: any;
    subServices: any[];
    subServicesAlt: any[];
    ubzilLoader: boolean = true;
    noSearch: boolean = false;
    latitude:any;
    longitude:any;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public appUtils: AppUtilFunctions,
        public modalCtrl:ModalController,
        public services: ServicesProvider,
        public events: Events

    ) {

        this.pageData = this.navParams.get('pageData');

        console.log('page params Data geted',this.pageData);
        //this.initializeItems();

    }
    
    ionViewWillEnter() {
        // Run After Page Already Entered
       // this.events.publish('changeConfig', 'tabsHideOnSubPages', true)
    }
    ionViewWillLeave() {
        //this.events.publish('changeConfig', 'tabsHideOnSubPages', false)
        //console.log('aLL userservice in ionViewWillLeave ',this.userServices);
    }

    ionViewDidLoad() {
        //console.log('aLL userservice ',this.userServices);
        this.services.getSubCategory(
            {
                //"user_id": "3",
                //"verifycode": "$2y$12$XQBdOjshGvoSRcT6uTlJaOkOiV.htMTyyT09IXxdjHrSQeoc/vgkO",
                "service_id": this.pageData.id,
                "lang_code": this.appUtils.CurrentLang
            }
        ).subscribe(({ status, error, data}) => {
            if (status === 'success') {
                console.log('data from sub category',data)
                this.subServices = data.reverse();                
                //console.log('data from sub category reverse',this.subServices)
                this.subServicesAlt = data.reverse();
            } else {
                this.appUtils.AppToast(error);
            }
            
        }, err => {
            if (err.error instanceof Error) {
                console.warn('client side error', err);
                this.appUtils.AppToast('الرجاء المحاولة مرة اخرى');
            } else {
                console.warn('server side error ', err);
                this.appUtils.AppToast('الرجاء  المحالة مرة اخرى');
                this.ubzilLoader = false
                
            }
            }, () => {
            this.ubzilLoader = false
        })
    }

    filterServices(ev: any) {
        
        let val = ev.target.value;
        this.noSearch = false;
        this.subServices = this.subServicesAlt;

        if (val && val.trim()) {
            this.subServices = this.subServices.filter((service) => {
                return (service.service_name.search(val) > -1);
            });
            if (this.subServices.length == 0) {
                console.log("this is empty");
                this.noSearch = true
            }
        }
    }

    navigateTo(serviceDetails: {id:number, service_name:string, subCount: number, type: number}): void {
        console.log('serviceDetails.type', serviceDetails.type);
        if (serviceDetails.subCount <= 0) {
            if (serviceDetails.type == 1) {

                this.navCtrl.push('AddRequest', { pageData: { ...serviceDetails, lang_code:this.appUtils.CurrentLang } })
                
            } else {
                this.navCtrl.push('UserList', { pageData: serviceDetails})
                //this.locationmodal();
            }

        } else {
            this.navCtrl.push('SubCategory', { pageData: serviceDetails})
            //this.navCtrl.push('SubCategory', { pageData: { ...serviceDetails, comeFrom:this.comeFrom,serv:this.userServices? this.userServices:[]} })
        }
        
    }
    
    /* locationmodal() {
        let pageData:any = null;
        if (this.latitude  && this.longitude ) {
            pageData = { latitude: this.latitude, longitude: this.longitude };
        }
        let modal = this.modalCtrl.create(GetLocation, {pageData});
        modal.onDidDismiss((data) => {
          console.log('map data from modal', data);
          if (data && data.latitude && data.longitude) {
            //console.log(data);
            this.latitude = data.latitude;
            this.longitude = data.longitude;
          }
    
        });
        modal.present();
    } */
    // ahmed ouda 
    // imagePath(img) {
    //    return 'http://ubzil.com/templates/default/uploads/service/icons/'+img
    // }

    imagePath(img) {
        return this.appUtils.UPLOAD_FOLDER+'service/icons/'+img
    }

    // initializeItems() {
    //     this.items = [
    //         { "id": 0, "name": "iron", "img": "assets/img/png/iron.png" },
    //         { "id": 1, "name": "cleaner", "img": "assets/img/png/washing-machine.png" },
    //         { "id": 2, "name": "washing", "img": "assets/img/png/liquid-soap.png" },
    //         { "id": 3, "name": "home", "img": "assets/img/png/cleaner.png" },
    //         { "id": 4, "name": "fridge", "img": "assets/img/png/portable-fridge.png" },
    //         { "id": 5, "name": "clothes", "img": "assets/img/png/washing-machine.png" },
    //         { "id": 6, "name": "iron", "img": "assets/img/png/cleaner.png" },
    //         { "id": 7, "name": "تنظيف", "img": "assets/img/png/washing-machine.png" },
    //         { "id": 3, "name": "غسيل", "img": "assets/img/png/cleaner.png" },
    //         { "id": 4, "name": "تلاجات", "img": "assets/img/png/portable-fridge.png" },
    //         { "id": 5, "name": "غسيل ملابس", "img": "assets/img/png/washing-machine.png" },
    //         { "id": 6, "name": "سجاد", "img": "assets/img/png/cleaner.png" },
    //         { "id": 5, "name": "اثاث", "img": "assets/img/png/washing-machine.png" }
    //     ];
    // }


}
