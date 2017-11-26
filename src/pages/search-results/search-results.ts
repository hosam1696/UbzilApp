// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams, Events, ActionSheetController} from 'ionic-angular';

// Providers


// Req Pages


@IonicPage()
@Component({
    selector: 'page-search-results',
    templateUrl: 'search-results.html',
})
export class SearchResults {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events
    ) {
    }

    ionViewDidEnter() {
        // Run After Page Already Entered

    }

    ionViewDidLoad() {
        // Run After Page Already Loaded

    }

    toroot() {
        this.navCtrl.popToRoot();
    }




}
