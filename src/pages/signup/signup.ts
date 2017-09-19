import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, AlertController, ToastController, ActionSheetController } from 'ionic-angular';


import { SMS } from "../../providers/sms";
import { Login } from "../login/login";

@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class Signup {

    step: any;
    randcode: any;
    // Step 1
    mobile: any;
    CountryCode: any;
    spinner: any;
    // Step 2
    vercode: any;
    // Select option
    selectOptions: any;
    MembershipType: any;
    role: any;
    // Signup Information
    name: any;
    mail: any;
    password: any;
    repassword: any;
    city: any;
    cities: any;
    signupload: any = false;
    // Profile Fields
    first_name: any = null;
    last_name: any = null;
    city_id: any = null;
    company_name: any = null;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public toastCtrl: ToastController,
        public actionSheetCtrl: ActionSheetController,
        public loadingCtrl: LoadingController,
        public events: Events,
        public sms: SMS,
    ) {
        this.step = 1;
        this.randcode = '8816';
        this.CountryCode = '2';
        this.city = 'Riyadh';
        this.mobile = '';
        this.vercode = '';
        this.MembershipType = 'Passenger';
        this.role = 5;
        console.log('Step :' + this.step);
    }

    ionViewDidEnter() {
        // Run After Page Already Entered
    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
    }

    Step1() {
        this.step = 1;
    }

    Step6(MembershipType) {
        this.spinner = 1;
        this.step = 6;
        this.MembershipType = MembershipType;
        console.log(MembershipType);
    }


    goSignin() {
        this.navCtrl.push(Login);
    }




}
