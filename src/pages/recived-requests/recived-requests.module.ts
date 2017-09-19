import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecivedRequests } from './recived-requests';

@NgModule({
  declarations: [
    RecivedRequests,
  ],
  imports: [
    IonicPageModule.forChild(RecivedRequests),
  ],
  exports: [
    RecivedRequests
  ]
})
export class SettingsModule {}
