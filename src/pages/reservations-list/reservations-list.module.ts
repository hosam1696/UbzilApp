import { TranslateModule } from 'ng2-translate/ng2-translate';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationsList } from './reservations-list';
import { MomentModule } from 'angular2-moment';
import { ComponentsModule } from './../../components/components.module';


@NgModule({
  declarations: [
    ReservationsList,
  ],
  imports: [
    IonicPageModule.forChild(ReservationsList),
    TranslateModule,
    MomentModule,
    ComponentsModule
  ],
  exports: [
    ReservationsList
  ]
})
export class SettingsModule {}
