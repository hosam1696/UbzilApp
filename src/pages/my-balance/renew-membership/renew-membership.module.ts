import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {RenewMembership} from './renew-membership';
import {TranslateModule} from "ng2-translate";
//import { MomentModule } from 'angular2-moment';
@NgModule({
  declarations: [
    RenewMembership,
  ],
  imports: [
    IonicPageModule.forChild(RenewMembership),
    TranslateModule,
    //MomentModule
  ],
  exports: [
    RenewMembership
  ]
})
export class SettingsModule {}
