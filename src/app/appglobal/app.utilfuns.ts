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


    
    public AppToast(message:string){

        let toast = this.toastCtrl.create({
            message,
            duration: 3000
        })

        toast.present()
    }

    public get CurrentLang():string {
        return this.translate.currentLang
    }

    public getLangValue(valKey:string):string {
       return  AsyncPipe.call((this, this.translate.get(valKey)));
        
        
    }
}
 
