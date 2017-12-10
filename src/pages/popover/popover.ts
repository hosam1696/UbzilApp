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

        this.phonenum = this.navParams.get('TellList');
        console.log('in popover phones', this.phonenum);
        for (let i of this.phonenum) {
            console.log("number is " + i['num_value']);
        }
    }

    close() {
        this.viewCtrl.dismiss();
    }

}
