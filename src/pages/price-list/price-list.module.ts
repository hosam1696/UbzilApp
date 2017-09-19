import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PriceList  } from './price-list';

@NgModule({
  declarations: [
    PriceList,
  ],
  imports: [
    IonicPageModule.forChild(PriceList),
  ],
  exports: [
    PriceList
  ]
})
export class SettingsModule {}
