import { ServicesProvider } from './../../providers/services/services';
import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

// Providers
// Req Pages
import {UserList} from '../user-list/user-list';
import {AddRequest} from '../add-request/add-request';
import {SearchService} from '../search-service/search-service';
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

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public appUtils: AppUtilFunctions,
        public services: ServicesProvider

    ) {

        this.pageData = this.navParams.get('pageData');

        console.log(this.pageData);


        this.initializeItems();

    }

    initializeItems() {
        this.items = [
            {"id": 0, "name": "iron", "img": "assets/img/png/iron.png"},
            {"id": 1, "name": "cleaner", "img": "assets/img/png/washing-machine.png"},
            {"id": 2, "name": "washing", "img": "assets/img/png/liquid-soap.png"},
            {"id": 3, "name": "home", "img": "assets/img/png/cleaner.png"},
            {"id": 4, "name": "fridge", "img": "assets/img/png/portable-fridge.png"},
            {"id": 5, "name": "clothes", "img": "assets/img/png/washing-machine.png"},
            {"id": 6, "name": "iron", "img": "assets/img/png/cleaner.png"},
            {"id": 7, "name": "تنظيف", "img": "assets/img/png/washing-machine.png"},
            {"id": 3, "name": "غسيل", "img": "assets/img/png/cleaner.png"},
            {"id": 4, "name": "تلاجات", "img": "assets/img/png/portable-fridge.png"},
            {"id": 5, "name": "غسيل ملابس", "img": "assets/img/png/washing-machine.png"},
            {"id": 6, "name": "سجاد", "img": "assets/img/png/cleaner.png"},
            {"id": 5, "name": "اثاث", "img": "assets/img/png/washing-machine.png"}
        ];
    }

    ionViewDidEnter() {
        // Run After Page Already Entered
    }

    ionViewDidLoad() {
        this.services.getSubDirectory(
            {
                "user_id": "3",
                "verifycode": "$2y$12$XQBdOjshGvoSRcT6uTlJaOkOiV.htMTyyT09IXxdjHrSQeoc/vgkO",
                "service_id": this.pageData.id,
                "lang_code": this.appUtils.CurrentLang
            }
        ).subscribe(res => {
            console.log(res);
            }, err => {
                if (err.error instanceof Error) {
                    console.warn('client side error', err);
                } else {
                    console.warn('server side error ', err);    
            }
        })

    }
  
/*
    goAddRequest() {
        this.sec = this.navParams.get('type');
        console.log(this.sec);
        if (this.sec == 'book') {
            this.navCtrl.push(UserList);
        } else if (this.sec == 'qoutes') {
            this.navCtrl.push(AddRequest);
        }
        else {
            return this.Servicelocationmodal();
        }
    }

*/

    getItems(ev: any) {
        // Reset items back to all of the items
        this.initializeItems();

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
                this.items = this.items.filter((item) => {
                    return (item.name.search(val) > -1);
                });
//                if (this.items.length==0){
//                    console.log("this is empty");
//                }
            }
        }

    }
