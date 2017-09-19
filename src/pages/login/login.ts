import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';

import { Signup } from '../signup/signup';
import { ForgetPass } from '../forget-pass/forget-pass';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  type: any;
  id: any;
  headerimg: any;
  username:any;
  password:any;
  loginload:any;
  Token:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public events: Events
  ) {
    this.loginload = false ;
  }

  ionViewDidEnter(){
    console.log('enter');
    // Run After Page Already Entered
  }

  ionViewDidLoad() {
    console.log('load');
    // Run After Page Already Loaded
    this.headerimg = '../../assets/img/ba_logo.png';    
   
  }

  goSignup(){
    this.navCtrl.push(Signup);
  }

  goForgetPass(){
    this.navCtrl.push(ForgetPass)
    
  }


  userToken(){
    this.events.publish('user:getToken');
  }

  userLogin() {
    
  }



}