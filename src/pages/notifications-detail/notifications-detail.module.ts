import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {NotificationsDetail} from './notifications-detail';
import {TranslateModule} from "ng2-translate";

@NgModule({
  declarations: [
    NotificationsDetail,
  ],
  imports: [
    IonicPageModule.forChild(NotificationsDetail),
    TranslateModule
  ],
  exports: [
    NotificationsDetail
  ]
})
export class SettingsModule {}
