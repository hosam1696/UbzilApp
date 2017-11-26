import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
import { UserProvider } from './../../providers/user/user';
import {Component} from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import {TranslateService} from 'ng2-translate';

@IonicPage()
//@IonicPage({ name: 'page-login' })
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  spinLoader: boolean = false;
  username: string;
  password: string;
  loader: boolean = false;

  constructor(
      public navCtrl: NavController,
      public events: Events,
      private userProvider: UserProvider,
      public appUtils: AppUtilFunctions,
      public translateService :TranslateService
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
      this.loader = true;
      console.log('you have entered ', username, password);
      this.userProvider
        .LoginUser({ username, password })
        .subscribe(
          userData => {
            console.log(userData);
            if (userData.status === 'success') {
              this.appUtils.storage.set('localUserInfo', userData.data)
                .then(() => {
                  this.navCtrl.setRoot('Tabs');
                })
            }else{
              this.translateService.get('username-and-pass-dont-match')
              .subscribe( value => {this.appUtils.AppToast(value)})
            }
          },
          err => {
            this.loader = false;
            if (err.error instanceof Error) {
                console.warn('client side error', err)
            } else {
              console.warn('server side error', err);
              }
          },
          () => {
            this.loader = false;
          }
        
        );

    }
  }


}
