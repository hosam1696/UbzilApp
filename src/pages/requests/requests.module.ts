import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Requests } from './requests';

@NgModule({
  declarations: [
    Requests,
  ],
  imports: [
    IonicPageModule.forChild(Requests),
  ],
  exports: [
    Requests
  ]
})
export class SettingsModule {}
