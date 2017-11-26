import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PriceList} from './price-list';
import {TranslateModule} from "ng2-translate";

@NgModule({
  declarations: [
    PriceList,
  ],
  imports: [
    IonicPageModule.forChild(PriceList),
    TranslateModule
  ],
  exports: [
    PriceList
  ]
})
export class SettingsModule {}
