import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {Requests} from './requests';
import {TranslateModule} from "ng2-translate";

@NgModule({
  declarations: [
    Requests,
  ],
  imports: [
    IonicPageModule.forChild(Requests),
    TranslateModule
  ],
  exports: [
    Requests
  ]
})
export class SettingsModule {}
