import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';


//import { Signup } from '../signup/signup';
//import { Login } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-forget-pass',
  templateUrl: 'forget-pass.html',
})
export class ForgetPass {

  phone: string;
  spinLoader:boolean = false;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public events: Events
  ) {

  }


  ionViewDidLoad() {
    console.log('load');

    
    
  }

  navigateTo(page: string): void {
    this.navCtrl.push(page)
  }
  sendPhone(phoneNumber) {

  }


}