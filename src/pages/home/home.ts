import {AppUtilFunctions} from '../../app/appglobal/app.utilfuns';
// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams,} from 'ionic-angular';


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
       public appUtils: AppUtilFunctions
    ) {


    }


    goSubCategory(type) {
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

        this.appUtils.getLangValue('language')
            .then(val=>{
                console.log('Get Lang Value of key (language)', val);
            })

    }


}
