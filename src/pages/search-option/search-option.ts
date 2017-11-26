// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, ViewController, NavParams, Events, ActionSheetController} from 'ionic-angular';

// Providers

// Req Pages


@IonicPage()
@Component({
    selector: 'page-search-option',
    templateUrl: 'search-option.html',
})
export class SearchOption {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public events: Events,
        public actionSheetCtrl: ActionSheetController,
        public modalCtrl: ModalController
    ) {
    }

    ionViewDidEnter() {
        // Run After Page Already Entered

    }

    ionViewDidLoad() {
        // Run After Page Already Loaded

    }
    dismiss() {
        this.viewCtrl.dismiss();
    }


}
