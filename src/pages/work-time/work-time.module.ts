import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkTime  } from './work-time';
import { TranslateModule } from 'ng2-translate/ng2-translate';

@NgModule({
  declarations: [
    WorkTime,
  ],
  imports: [
    IonicPageModule.forChild(WorkTime),
    TranslateModule
  ],
  exports: [
    WorkTime
  ]
})
export class SettingsModule {}
