// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, } from 'ionic-angular';

// Providers


// Req Pages
//import {SubCategory} from "../subcategory/subcategory";
import {SearchResults} from "../search-results/search-results";



@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {

    segment: any;
    name: any;
    type:any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,

        public toastCtrl: ToastController
    ) {
    }


    gosubcategory(type) {
        this.navCtrl.push('SubCategory',{type:type});
        console.log(type);
    }
    goSearchResults() {
        this.navCtrl.push(SearchResults);
    }

    ionViewDidEnter() {
        // Run After Page Already Entered
    }

    ionViewDidLoad() {
        this.segment = "services";

    }


}
