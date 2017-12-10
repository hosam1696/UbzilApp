// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, ViewController, NavParams, Events, ActionSheetController, ToastController} from 'ionic-angular';
import {TranslateService} from 'ng2-translate';

// Req Pages
import { ServicesProvider } from './../../providers/services/services';
import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';


@IonicPage()
@Component({
    selector: 'page-price-list',
    templateUrl: 'price-list.html',
})
export class PriceList {
    elements: any[];
    public name: string;
    public price: number;
    closetext: any;
    toasttext: any;
    currentLang: string;
    allAnalysis: any;
    userLocal:any;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public events: Events,
        public translateService: TranslateService,
        private toastCtrl: ToastController,
        public actionSheetCtrl: ActionSheetController,
        public modalCtrl: ModalController,
        public serviceProvider: ServicesProvider,
        public appUtils: AppUtilFunctions,
    ) {
        console.log('*************** PriceList ******************');
        
        this.elements = this.navParams.get('pageData');
        if(!this.elements){
            this.elements = [{"id":"","title": "", "price": ""}]
        }
        for (let i in this.elements) {
            console.log("title is " + this.elements[i].title);
        }

        console.log(this.elements);

        this.currentLang = this.appUtils.CurrentLang;
    }

    ionViewDidEnter() {
        // Run After Page Already Entered

    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
        this.translateService.get('Changes-saved')
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
            console.log('localUserInfo in PriceList',this.userLocal);
            // TODO: check if usellocalid == geted id show my profile 
        })
        this.getAnalysis();
    }
    

    // TODO: Get all analysis to add to labs with price
    getAnalysis(){
        this.serviceProvider.getAnalysis({"lang_code":this.currentLang}).subscribe((data) => {
            if (data) {
                console.log('analysis From server', data);
                this.allAnalysis = data;
            }
            
        }, err => {
            if (err.error instanceof Error) {
                console.warn('client side errror', err)
            } else {
                console.warn('server side error', err)
            }
        }, () => {
            //this.showLoader = false
        })
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
    

    addmore(element) {
        var p = {"id":"","title": "", "price": ""};
        this.elements.push(p);
        console.log("price list is array", this.elements);
    }


    SaveChanges() {
        this.viewCtrl.dismiss(this.elements);
        console.log('saved price LKist', this.elements)
        this.addAnalysisPrice();
        let toast = this.toastCtrl.create({
            message: this.toasttext,
            position: "middle",
            showCloseButton: true,
            closeButtonText: this.closetext,
            duration: 3000
        });
        toast.present();
    }

    // TODO: Get all analysis to add to labs with price
    addAnalysisPrice(){
        this.serviceProvider.addAnalysisPrice(
        {
            "user_id":this.userLocal['id'],            
            "priceList":this.elements
        }
        ).subscribe((data) => {
            if (data) {
                console.log('add Analysis From server', data);
            }
            
        }, err => {
            if (err.error instanceof Error) {
                console.warn('client side errror', err)
            } else {
                console.warn('server side error', err)
            }
        }, () => {
            //this.showLoader = false
        })
    }


}