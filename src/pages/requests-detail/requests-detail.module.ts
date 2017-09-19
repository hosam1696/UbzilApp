import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestsDetail } from './requests-detail';

@NgModule({
  declarations: [
    RequestsDetail,
  ],
  imports: [
    IonicPageModule.forChild(RequestsDetail),
  ],
  exports: [
    RequestsDetail
  ]
})
export class SettingsModule {}
