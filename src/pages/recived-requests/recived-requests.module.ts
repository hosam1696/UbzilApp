import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {RecivedRequests} from './recived-requests';
import {TranslateModule} from "ng2-translate";

@NgModule({
  declarations: [
    RecivedRequests,
  ],
  imports: [
    IonicPageModule.forChild(RecivedRequests),
    TranslateModule
  ],
  exports: [
    RecivedRequests
  ]
})
export class SettingsModule {}
