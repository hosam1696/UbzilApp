import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {BalanceHistory} from './balance-history';
import {TranslateModule} from "ng2-translate";

@NgModule({
  declarations: [
    BalanceHistory,
  ],
  imports: [
    IonicPageModule.forChild(BalanceHistory),
    TranslateModule
  ],
  exports: [
    BalanceHistory
  ]
})
export class SettingsModule {}
