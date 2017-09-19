// Main Components
import {Component} from '@angular/core';
import {ViewController, NavParams} from 'ionic-angular';

// Providers

// Req Pages


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
