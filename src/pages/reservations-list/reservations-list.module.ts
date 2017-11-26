import { TranslateModule } from 'ng2-translate/ng2-translate';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationsList } from './reservations-list';

@NgModule({
  declarations: [
    ReservationsList,
  ],
  imports: [
    IonicPageModule.forChild(ReservationsList),
    TranslateModule
  ],
  exports: [
    ReservationsList
  ]
})
export class SettingsModule {}
