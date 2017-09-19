import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BalanceHistory } from './balance-history';

@NgModule({
  declarations: [
    BalanceHistory,
  ],
  imports: [
    IonicPageModule.forChild(BalanceHistory),
  ],
  exports: [
    BalanceHistory
  ]
})
export class SettingsModule {}
