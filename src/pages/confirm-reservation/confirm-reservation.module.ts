import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ConfirmReservation} from './confirm-reservation';

@NgModule({
  declarations: [
    ConfirmReservation,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmReservation)
  ],
  exports: [
    ConfirmReservation
  ]
})
export class ContactusModule {}
