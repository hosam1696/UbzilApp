import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {RequestsDetail} from './requests-detail';
import {TranslateModule} from "ng2-translate";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    RequestsDetail,
  ],
  imports: [
    IonicPageModule.forChild(RequestsDetail),
    TranslateModule,
    MomentModule
  ],
  exports: [
    RequestsDetail
  ],
  providers: [
    InAppBrowser
  ]
})
export class SettingsModule {}
