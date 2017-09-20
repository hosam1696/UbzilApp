import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ExcutedRequests} from './excuted-requests';
import {TranslateModule} from "ng2-translate";

@NgModule({
  declarations: [
    ExcutedRequests,
  ],
  imports: [
    IonicPageModule.forChild(ExcutedRequests),
    TranslateModule
  ],
  exports: [
    ExcutedRequests
  ]
})
export class SettingsModule {}
