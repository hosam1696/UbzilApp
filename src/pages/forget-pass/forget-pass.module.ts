import { TranslateModule } from 'ng2-translate/ng2-translate';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgetPass } from './forget-pass';

@NgModule({
  declarations: [
    ForgetPass,
  ],
  imports: [
    IonicPageModule.forChild(ForgetPass),
    TranslateModule
  ],
  exports: [
    ForgetPass
  ]
})
export class LoginModule {}
