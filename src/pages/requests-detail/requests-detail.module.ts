import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {RequestsDetail} from './requests-detail';
import {TranslateModule} from "ng2-translate";

@NgModule({
  declarations: [
    RequestsDetail,
  ],
  imports: [
    IonicPageModule.forChild(RequestsDetail),
    TranslateModule
  ],
  exports: [
    RequestsDetail
  ]
})
export class SettingsModule {}
