import { TranslateService } from 'ng2-translate';
import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, } from 'ionic-angular';

// Providers


// Req Pages
//import {SubCategory} from "../subcategory/subcategory";
//import {SearchResults} from "../search-results/search-results";



@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage extends AppUtilFunctions{

    segment: any;
    name: any;
    type:any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public translate: TranslateService,
        public toastCtrl: ToastController
    ) {
        super( toastCtrl,translate)


    }


    gosubcategory(type) {
        this.navCtrl.push('SubCategory',{type:type});
        console.log(type);

        console.log('Active View Controller is', this.navCtrl.getActive());
    }
    goSearchResults() {
        this.navCtrl.push('SearchResults');
    }

    ionViewDidEnter() {
        // Run After Page Already Entered
    }

    ionViewDidLoad() {
        this.segment = "services";

        super.getLangValue('language')
            .then(val=>{
                console.log('Get Lang Value of key (language)', val);
            })

    }


}
