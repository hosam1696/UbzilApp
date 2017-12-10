import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {BalanceHistory} from './balance-history';
import {TranslateModule} from "ng2-translate";
import { MomentModule } from 'angular2-moment';
@NgModule({
  declarations: [
    BalanceHistory,
  ],
  imports: [
    IonicPageModule.forChild(BalanceHistory),
    TranslateModule,
    MomentModule
  ],
  exports: [
    BalanceHistory
  ]
})
export class SettingsModule {}
