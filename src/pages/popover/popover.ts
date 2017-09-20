// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';

// Providers

// Req Pages

@IonicPage()
@Component({
    selector: 'page-popover',
    templateUrl: 'popover.html',
})
export class PopoverContentPage {
    phonenum: any[];
    constructor(
        public navParams: NavParams,
        public viewCtrl: ViewController
    ) {

        this.phonenum = this.navParams.get('TelList');
        for (let i in this.phonenum) {
            console.log("number is " + this.phonenum[i].number);
        }

        console.log(this.phonenum);
    }

    close() {
        this.viewCtrl.dismiss();
    }

}
