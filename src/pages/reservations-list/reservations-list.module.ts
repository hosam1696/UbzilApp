import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationsList } from './reservations-list';

@NgModule({
  declarations: [
    ReservationsList,
  ],
  imports: [
    IonicPageModule.forChild(ReservationsList),
  ],
  exports: [
    ReservationsList
  ]
})
export class SettingsModule {}
