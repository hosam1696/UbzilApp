import { TranslateModule } from 'ng2-translate/ng2-translate';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Contactus } from './contactus';

@NgModule({
  declarations: [
    Contactus,
  ],
  imports: [
    IonicPageModule.forChild(Contactus),
    TranslateModule
  ],
  exports: [
    Contactus
  ]
})
export class ContactusModule {}
