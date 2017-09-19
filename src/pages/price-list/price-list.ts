// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, ViewController, NavParams, Events, ActionSheetController, ToastController} from 'ionic-angular';
import {TranslateService} from 'ng2-translate';

// Req Pages


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


    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public events: Events,
        public translate: TranslateService,
        private toastCtrl: ToastController,
        public actionSheetCtrl: ActionSheetController,
        public modalCtrl: ModalController,
    ) {
        this.elements = this.navParams.get('priceList');
        for (let i in this.elements) {
            console.log("name is " + this.elements[i].name);
        }

        console.log(this.elements);
    }

    ionViewDidEnter() {
        // Run After Page Already Entered

    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
        this.translate.get('Changes-saved')
            .subscribe(lang => {
                this.toasttext = lang;
            })
        this.translate.get('Close')
            .subscribe(lang => {
                this.closetext = lang;
            })
    }


    dismiss() {
        this.viewCtrl.dismiss();
    }



    addmore(element) {
        var p = {"name": this.name, "price": this.price};
        this.elements.push(p);
        console.log("tis is array", this.elements);
    }
    SaveChanges() {
        this.viewCtrl.dismiss(this.elements);
        let toast = this.toastCtrl.create({
            message: this.toasttext,
            position: "middle",
            showCloseButton: true,
            closeButtonText: this.closetext,
            duration: 3000
        });
        toast.present();
    }

}