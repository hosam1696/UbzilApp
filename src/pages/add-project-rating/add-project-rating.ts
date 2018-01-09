import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {Ionic2RatingModule} from 'ionic2-rating';
import {TranslateService} from 'ng2-translate';


// Providers
//import { UserProvider } from './../../providers/user/user';
import {ProjectsProvider} from './../../providers/projects/project';
// Req Pages


@IonicPage()
@Component({
    selector: 'page-AddProjectRating',
    templateUrl: 'add-project-rating.html',
})
export class AddProjectRating {
    element: any;
    closetext: any;
    toasttext: any;
    pageParams:any;
    rate1:any;
    rate2:any;
    rate3:any;
    rateMsg:any;
    providerData:any;
    showLoader: boolean = true;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public translateService: TranslateService,
        private toastCtrl: ToastController,
        public RatingModule: Ionic2RatingModule,
        public appUtils: AppUtilFunctions,
        public projectsProvider: ProjectsProvider,

    ) {
        console.log('*************** AddProjectRating ******************');
        this.pageParams = this.navParams.get('pageData');
        console.log('pageParams in  AddProjectRating', this.pageParams);
    }



    ionViewDidEnter() {
        // Run After Page Already Entered
    }

    ionViewDidLoad() {
        this.translateService.get('your-review-added')
            .subscribe(lang => {
                this.toasttext = lang;
            })
        this.translateService.get('Close')
            .subscribe(lang => {
                this.closetext = lang;
            })

        this.getChoosedProviderData();

    }

    dismiss(id) {
        this.viewCtrl.dismiss(id);
    }

    getChoosedProviderData() {
        let sendData = {
            'user_id' :this.pageParams.provider_id,
            }    
        this.projectsProvider
        .getChoosedProviderData(sendData)
        .subscribe((data)=> {
                if (data) {
                    this.providerData = data;
                }
            },
            err => {
                this.showLoader = false;
                if (err.error instanceof Error) {
                    console.warn('client side error', err)
                } else {
                    console.warn('server side error', err);
                }
            },
            () => {
                this.showLoader = false;
            }
        
        );
    }

    AddProjectRating() {
        console.log('rate will send to server',this.rate1,this.rate2,this.rate3);
        if(!this.rate1 || !this.rate2 || !this.rate3){
            this.translateService.get('project_rate_required')
            .subscribe( value => {this.appUtils.AppToast(value)})
        }
        else{
            let rateData = {
                'user_id' :this.pageParams.user_id,
                'verifycode' :this.pageParams.verifycode,                
                'provider_id' :this.pageParams.provider_id,
                'order_id' :this.pageParams.order_id,
                'rating_message' :this.rateMsg,
                'rating' :[
                    {
                        'question_id' :'1',
                        'rating_value' :this.rate1
                    },
                    {
                        'question_id' :'2',
                        'rating_value' :this.rate2
                    },
                    {
                        'question_id' :'3',
                        'rating_value' :this.rate3
                    }
                ]
              }    
            this.projectsProvider
            .AddProjectRating(rateData)
            .subscribe((data)=> {
                if (data) {
                    this.dismiss(this.pageParams.indx);
                    let toast = this.toastCtrl.create({
                        message: this.toasttext,
                        position: "middle",
                        showCloseButton: true,
                        closeButtonText: this.closetext,
                        duration: 3000
                    });
                    toast.present();
                }
              },
              err => {
                if (err.error instanceof Error) {
                    console.warn('client side error', err)
                } else {
                  console.warn('server side error', err);
                  }
              },
              () => {
              }
            
            );
        }
    }

    onModelChange(val) {
        console.log('Val changed val',val);
        console.log('Val changed user_id',this.pageParams.user_id);
        console.log('Val changed provider_id',this.pageParams.provider_id);
    }
}
