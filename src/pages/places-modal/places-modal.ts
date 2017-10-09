import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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
  ubzilLoader: boolean = true;
  targetPlace: any = { country_id: 327, country: 'مصر' };
  parentCount = 0;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public userProv: UserProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacesModalPage');
    
    this.getPlaces(327) // 327 for EGYPT
  }

  getPlaces(parent: number, selectedPlaceName?: string) {
    this.ubzilLoader = true;
    this.userProv.getPlaces(
      {
        "user_id": "3",
        "parent": parent,
        "verifycode": "$2y$12$XQBdOjshGvoSRcT6uTlJaOkOiV.htMTyyT09IXxdjHrSQeoc/vgkO", "lang_code": "ar"
      }).subscribe(({ status, error, data }) => {

        if (status === 'success') {
          this.Places = data;
        } else {
          console.warn(error);
          if (this.parentCount === 3 && !this.targetPlace.district) {

            this.targetPlace.district = selectedPlaceName;
            this.targetPlace.district_id = parent;
          }
          this.closeModal()
          
        }

      }, err => {
        console.warn(err);
        this.ubzilLoader = false
      }, () => {
        this.ubzilLoader = false;
        
        console.log(this.parentCount);
        if (this.parentCount > 0) {
          if (this.parentCount === 1) {

            this.targetPlace.governorate = selectedPlaceName;
            this.targetPlace.governorate_id = parent;
          }
          if (this.parentCount === 2) {

            this.targetPlace.city = selectedPlaceName;
            this.targetPlace.city_id = parent;
          }
          if (this.parentCount === 3) {

            this.targetPlace.district = selectedPlaceName;
            this.targetPlace.district_id = parent;
          }


        }
        this.parentCount++;
      })
  }

  closeModal() {
    this.viewCtrl.dismiss(this.targetPlace)
  }

}
