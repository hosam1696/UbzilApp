import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {AppUtilFunctions} from '../../app/appglobal/app.utilfuns';
/**
 * Generated class for the PlacesModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-places-modal',
  templateUrl: 'places-modal.html',
})
export class PlacesModalPage {
  Places: any[];
  localUser: any;
  loader: boolean = true;
  targetPlace: any = { country_id: 327, country: 'مصر' };
  parentCount = 0;
  pageParams: any;
  closemodels: boolean=true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public userProv: UserProvider,
    public appUtils: AppUtilFunctions,
  ){
    console.log('******************** PlacesModalPage Load ***************')
    this.pageParams = this.navParams.get('pageData');
    console.log('pageParams in PlacesModalPage', this.pageParams);
  }

  async ionViewDidEnter() {
      // Run After Page Already Entered
      let currentLang:string = await this.appUtils.CurrentLang;
      console.log('%s%c%s', 'The Language you are using now in PlacesModalPage is ', 'color: red;font-weight:bold', currentLang);

      this.localUser = await this.appUtils.storage.get('localUserInfo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacesModalPage');
    if(this.pageParams){
      this.parentCount = this.pageParams.parentCount;
      this.getGovOrSector(this.pageParams.parent,this.pageParams.selectedPlaceName);
    }else{
      this.getGovOrSector(327); // 327 for EGYPT
    }
  }

  navigateTo(parent: number, selectedPlaceName?: string): void {
    let data = {...this.pageParams,
        'parent': parent,
        'selectedPlaceName': selectedPlaceName,
        'parentCount':this.parentCount           
    }
    if (this.parentCount === 2) {
      console.log('places222',this.targetPlace);
      this.targetPlace.sector = selectedPlaceName;
      this.targetPlace.sector_id = parent;
      this.closeModal();
    }else{
      this.navCtrl.push('PlacesModalPage', {pageData : data})      
    }
  }

  getGovOrSector(parent: number, selectedPlaceName?: string) {
    this.loader = true;
    this.userProv.getGovOrSector(
      {
        "lang_code": this.appUtils.CurrentLang,
        "parent": parent
      }).subscribe((data) => {

        if (data) {
          this.Places = data;
                    
        } else {
          console.warn('no data placed');
        }

      }, err => {
        console.warn(err);
        this.loader = false
      }, () => {
        this.loader = false;
        
        console.log('parentCount', this.parentCount);
        if (this.parentCount > 0) {
          this.closemodels = false;
          if (this.parentCount === 1) {
            console.log('places111',this.targetPlace);
            this.targetPlace.governorate = selectedPlaceName;
            this.targetPlace.governorate_id = parent;
          }
        }
        this.parentCount++;
      })
  }

  closeModal() {
    console.log('place in function closeModal',this.targetPlace);
    let firstViewCtrl = this.navCtrl.first();
    // use this beacus i use pages in model
    this.navCtrl.popToRoot({animate: false}).then(() => firstViewCtrl.dismiss(this.targetPlace));
    // default
    //this.viewCtrl.dismiss(this.targetPlace);
  }
}
