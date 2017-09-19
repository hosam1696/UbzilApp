import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBalance } from './my-balance';

@NgModule({
  declarations: [
    MyBalance,
  ],
  imports: [
    IonicPageModule.forChild(MyBalance),
  ],
  exports: [
    MyBalance
  ]
})
export class SettingsModule {}
