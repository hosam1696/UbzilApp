import { TranslateModule } from 'ng2-translate/ng2-translate';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Settings } from './settings';

@NgModule({
  declarations: [
    Settings,
  ],
  imports: [
    IonicPageModule.forChild(Settings),
    TranslateModule
  ],
  exports: [
    Settings
  ]
})
export class SettingsModule {}
