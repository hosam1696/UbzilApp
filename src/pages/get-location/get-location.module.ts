import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GetLocation} from './get-location';
import {TranslateModule} from "ng2-translate";

@NgModule({
  declarations: [
    GetLocation,
  ],
  imports: [
    IonicPageModule.forChild(GetLocation),
    TranslateModule
  ],
  exports: [
    GetLocation
  ]
})
export class GetLocationModule {}
