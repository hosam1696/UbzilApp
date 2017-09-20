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
  type: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public appUtils: AppUtilFunctions) {


  }


  goSubCategory(type) {
    this.navCtrl.push('SubCategory', {type: type});
    console.log(type);

    console.log('Active View Controller is', this.navCtrl.getActive());
  }

  goSearchResults() {
    this.navCtrl.push('SearchResults');
  }

  async ionViewDidEnter() {
    // Run After Page Already Entered

    let currentLang = await this.appUtils.CurrentLang;

    console.log('%s%c%s', 'The Language you are using now is ', 'color: red;font-weight:bold', currentLang);

  }

  ionViewDidLoad() {
    this.segment = "services";

    console.log('%s%c%s', 'component class name we are using now ', 'color: green;font-weight:bold', this.navCtrl.getActive().id);

    console.log(`You are ${this.appUtils.IsConnected?'':'not'} connected to the internet`)

  }


}
