import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
import { UserProvider } from './../../providers/user/user';
import {Component} from '@angular/core';
import { IonicPage, NavController, Events, ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  type: any;
  id: any;
  headerimg: any;
  username: any;
  password: any;
  loginload: any;
  Token: any;

  constructor(public navCtrl: NavController,
              public events: Events,
              private userProvider: UserProvider,
              public appUtils: AppUtilFunctions
  ) {
    this.loginload = false;
  }

  ionViewDidEnter() {
    console.log('enter');
    // Run After Page Already Entered
  }

  ionViewDidLoad() {
    console.log('load');
    // Run After Page Already Loaded
    this.headerimg = '../../assets/img/ba_logo.png';

  }

  goSignup() {
    this.navCtrl.push('Signup');
  }

  goForgetPass() {
    this.navCtrl.push('ForgetPass')

  }

  userLogin(username: string, password:string) {
    if (!username || !password) {
      this.appUtils.AppToast(!username?'يرجى ادخال اسم المستخدم':'يرجى ادخال كلمة المرور')
    } else {
      console.log('you have entered ', username, password);
      this.userProvider
        .LoginUser({ username, password })
        .subscribe(userData => {
          
        });

    }
  }


}
