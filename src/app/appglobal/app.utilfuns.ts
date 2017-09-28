import {TranslateService} from 'ng2-translate';
import {Injectable} from '@angular/core';
import { ToastController, ToastOptions, Platform } from 'ionic-angular';
//import { AsyncPipe } from '@angular/common';
import "rxjs/add/operator/toPromise";
import { Network} from '@ionic-native/network';
import { Storage } from '@ionic/storage';

@Injectable()

export class AppUtilFunctions {

    constructor(
        public network: Network,
        public toastCtrl: ToastController,
        public translate: TranslateService,
        public platform: Platform,
        public storage: Storage
    ){}



    public AppToast(message:string, settings?:ToastOptions, callback?:any):void{

        let toast = this.toastCtrl.create({message,...{duration: 2500, position:'top'}, ...settings});
        // dev test only console.log(toast);
        toast.onDidDismiss(callback)
        toast.present();
    }

    public get CurrentLang():string {
        return this.translate.currentLang
    }

    public getLangValue(valKey:string):Promise<string> {
       return this.translate.get(valKey).toPromise();
    }

    public get IsConnected():boolean {
        return this.network.type != 'none'
    }

    public get GetPlatform():string {
        return this.platform.is('ios')?'ios':(this.platform.is('windows')?'windows':'android')
    }

    public get isRTL(): boolean {
        return this.platform.isRTL
    }
}

