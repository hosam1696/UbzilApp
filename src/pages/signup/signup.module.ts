import { TranslateModule } from 'ng2-translate/ng2-translate';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Signup } from './signup';

@NgModule({
  declarations: [
    Signup,
  ],
  imports: [
    IonicPageModule.forChild(Signup),
    TranslateModule
  ],
  exports: [
    Signup
  ]
})
export class SignupModule {}
