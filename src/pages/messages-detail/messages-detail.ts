// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams, Events, ViewController, ActionSheetController} from 'ionic-angular';
import {TranslateService} from 'ng2-translate';

// Providers

// Req Pages


@IonicPage()
@Component({
    selector: 'page-messages-detail',
    templateUrl: 'messages-detail.html',
})
export class MessagesDetail {
    titletext: any;
    foldertext: any;
    cameratext: any;
    canceltext: any;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public translate: TranslateService,
        public viewCtrl: ViewController,
        public actionSheetCtrl: ActionSheetController,

    ) {

    }

    ionViewDidEnter() {
        // Run After Page Already Entered

    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
        this.translate.get('Upload-Image')
            .subscribe(lang => {
                this.titletext = lang;
            })
        this.translate.get('From-file')
            .subscribe(lang => {
                this.foldertext = lang;
            })
        this.translate.get('From-camera')
            .subscribe(lang => {
                this.cameratext = lang;
            })
        this.translate.get('Cancel')
            .subscribe(lang => {
                this.canceltext = lang;
            })

    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
    loadImage() {

        let actionSheet = this.actionSheetCtrl.create({
            title: this.titletext,
            buttons: [
                {
                    icon: 'folder',
                    text: this.foldertext,
                    handler: () => {
                        console.log('Destructive clicked');
                    }
                }, {
                    icon: 'camera',
                    text: this.cameratext,
                    handler: () => {
                        console.log('Archive clicked');
                    }
                }, {
                    text: this.canceltext,
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });

        actionSheet.present();
    }
}



