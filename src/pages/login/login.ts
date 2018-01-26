import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
import { UserProvider } from './../../providers/user/user';
import {Component} from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  spinLoader: boolean = false;
  username: string;
  password: string;
  ubzilLoader: boolean = false;

  constructor(public navCtrl: NavController,
              public events: Events,
              private userProvider: UserProvider,
              public appUtils: AppUtilFunctions
  ) {
  }


  ionViewDidLoad() {
    //console.log('load');
    // Run After Page Already Loaded
    ///this.headerimg = '../../assets/img/ba_logo.png';

  }

  goSignup() {
    this.navCtrl.push('Signup');
  }

  goForgetPass() {
    this.navCtrl.push('ForgetPass')

  }

  userLogin(username: string, password: string) {

    let unvalid:(i:string)=>boolean = (input: string) => !input || !input.trim();

    if (unvalid(username) || unvalid(password)) {

      this.appUtils.AppToast(unvalid(username) ? 'يرجى ادخال اسم المستخدم' : 'يرجى ادخال كلمة المرور');
      unvalid(username)?(this.username=''):(this.password='')
    } else {
      this.ubzilLoader = true;
      console.log('you have entered ', username, password);
      this.userProvider
        .LoginUser({ username, password })
        .subscribe(
          userData => {
            if (userData.status === 'success') {
              this.appUtils.storage.set('localUserInfo', userData.data)
                .then(() => {
                  this.events.publish('changeRoot', 'Tabs');
                })
            }
          },
          err => {
            //for Dev Only
            /*
            this.appUtils.storage.set('localUserInfo', {id:15, username:'user name'})
            .then(() => {
              this.events.publish('changeRoot', 'Tabs');
            })*/
            if (err.error instanceof Error) {
                console.warn('client side error', err)
            } else {
              console.warn('server side error', err);
              }
          },
          () => {
            this.ubzilLoader = false;
          }

        );

    }
  }


}
