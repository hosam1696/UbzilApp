import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkTime  } from './work-time';

@NgModule({
  declarations: [
    WorkTime,
  ],
  imports: [
    IonicPageModule.forChild(WorkTime),
  ],
  exports: [
    WorkTime
  ]
})
export class SettingsModule {}
