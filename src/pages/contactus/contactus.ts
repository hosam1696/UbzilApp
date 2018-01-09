import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';

// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ViewController, NavParams, ToastController} from 'ionic-angular';
import {TranslateService} from 'ng2-translate';

// Providers
import { UserProvider } from './../../providers/user/user';
// Req Pages

@IonicPage()
@Component({
    selector: 'page-contactus',
    templateUrl: 'contactus.html',
})
export class Contactus {

    uid: any;
    msgSubject: any;
    msgBody: any;
    closetext: any;
    toasttext: any;
    addLoader : boolean =  false;
    showLoader: boolean = true;
    userLocal:any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        private toastCtrl: ToastController,
        public translateService: TranslateService,
        public appUtils: AppUtilFunctions,
        public userProvider: UserProvider,
    ) {
        this.uid = navParams.get('userId');
    }

    ionViewDidEnter() {
        // Run After Page Already Entered
    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
        this.translateService.get('Message-sent-successfully')
            .subscribe(lang => {
                this.toasttext = lang;
            })
        this.translateService.get('Close')
            .subscribe(lang => {
                this.closetext = lang;
            })
        this.appUtils.storage.get('localUserInfo')
        .then((data)=>{
            this.userLocal = data;
            console.log('localUserInfo in ProfilePage',this.userLocal);
        })
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
    
    Send() {
        if (!this.msgSubject) {
            this.translateService.get('plz_enter_contact_subject')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else if (!this.msgBody) {
            this.translateService.get('plz_enter_contact_body')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }else{
            this.addLoader = true;
            let sentData ={
                "subject": this.msgSubject,
                "body": this.msgBody,
                "email": this.userLocal.email,
            };
            this.userProvider.sendMailCallUs(sentData).subscribe((data) => {
                console.log('data From server', data);
                    if (data) {
                        this.addLoader = false;
                        this.dismiss();
                        let toast = this.toastCtrl.create({
                            message: this.toasttext,
                            position: "middle",
                            showCloseButton: true,
                            closeButtonText: this.closetext,
                            duration: 3000
                        });
                        toast.present(); 
                    }
                    
                }, err => {
                    this.addLoader = false;
                    if (err.error instanceof Error) {
                        console.warn('client side errror', err)
                    } else {
                        console.warn('server side error', err)
                    }
                }, () => {
                })
        }
    }


}
