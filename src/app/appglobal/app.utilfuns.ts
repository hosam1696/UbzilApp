import { TranslateService } from 'ng2-translate';
import { Injectable, ChangeDetectorRef } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { AsyncPipe } from '@angular/common';



@Injectable()

export class AppUtilFunctions {

    constructor(
        public toastCtrl: ToastController,
        public translate: TranslateService
    ){}


    
    public AppToast(message:string, settings?:{duration?:number, position?:string,showCloseButton?:boolean,closeButtonText:string}):void{

        let toast = this.toastCtrl.create({message, ...settings})

    
        toast.present()
    }

    public get CurrentLang():string {
        return this.translate.currentLang
    }

    public getLangValue(valKey:string):Promise<string> {
       return this.translate.get(valKey).toPromise();
        
        
    }
}
 
