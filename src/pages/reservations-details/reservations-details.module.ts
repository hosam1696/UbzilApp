import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ReservationDetails} from './reservations-details';
import {TranslateModule} from "ng2-translate";
//import { InAppBrowser } from '@ionic-native/in-app-browser';
//import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    ReservationDetails,
  ],
  imports: [
    IonicPageModule.forChild(ReservationDetails),
    TranslateModule,
    //MomentModule
  ],
  exports: [
    ReservationDetails
  ],
  providers: [
    //InAppBrowser
  ]
})
export class SettingsModule {}
