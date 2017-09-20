import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {Reservation} from './reservation';
import {TranslateModule} from "ng2-translate";

@NgModule({
  declarations: [
    Reservation,
  ],
  imports: [
    IonicPageModule.forChild(Reservation),
    TranslateModule
  ],
  exports: [
    Reservation
  ]
})
export class ReservationModule{}
