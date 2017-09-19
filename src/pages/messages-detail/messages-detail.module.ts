import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagesDetail } from './messages-detail';

@NgModule({
  declarations: [
    MessagesDetail,
  ],
  imports: [
    IonicPageModule.forChild(MessagesDetail),
  ],
  exports: [
    MessagesDetail
  ]
})
export class SettingsModule {}
