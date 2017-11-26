import { TranslateModule } from 'ng2-translate/ng2-translate';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyBalance } from './my-balance';

@NgModule({
  declarations: [
    MyBalance,
  ],
  imports: [
    IonicPageModule.forChild(MyBalance),
    TranslateModule
  ],
  exports: [
    MyBalance
  ]
})
export class SettingsModule {}
