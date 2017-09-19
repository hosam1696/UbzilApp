// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ModalController} from 'ionic-angular';

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

    public sec: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController

    ) {
        this.initializeItems();
        for (let i in this.items) {
            console.log("name is " + this.items[i].name);
        }
    }

    initializeItems() {
        this.items = [
            {"id": 0, "name": "iron", "img": "../assets/img/png/iron.png"},
            {"id": 1, "name": "cleaner", "img": "../assets/img/png/washing-machine.png"},
            {"id": 2, "name": "washing", "img": "../assets/img/png/liquid-soap.png"},
            {"id": 3, "name": "home", "img": "../assets/img/png/cleaner.png"},
            {"id": 4, "name": "fridge", "img": "../assets/img/png/portable-fridge.png"},
            {"id": 5, "name": "clothes", "img": "../assets/img/png/washing-machine.png"},
            {"id": 6, "name": "iron", "img": "../assets/img/png/cleaner.png"},
            {"id": 7, "name": "تنظيف", "img": "../assets/img/png/washing-machine.png"},
            {"id": 3, "name": "غسيل", "img": "../assets/img/png/cleaner.png"},
            {"id": 4, "name": "تلاجات", "img": "../assets/img/png/portable-fridge.png"},
            {"id": 5, "name": "غسيل ملابس", "img": "../assets/img/png/washing-machine.png"},
            {"id": 6, "name": "سجاد", "img": "../assets/img/png/cleaner.png"},
            {"id": 5, "name": "اثاث", "img": "../assets/img/png/washing-machine.png"}
        ];
    }

    ionViewDidEnter() {
        // Run After Page Already Entered
    }

    ionViewDidLoad() {


    }
    Servicelocationmodal() {
        let ServicelocationModal = this.modalCtrl.create(SearchService);
        ServicelocationModal.present();
        ServicelocationModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })
    }

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
