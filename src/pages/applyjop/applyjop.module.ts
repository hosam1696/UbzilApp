import { TranslateModule } from 'ng2-translate';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyJop } from './applyjop';

@NgModule({
  declarations: [
    ApplyJop,
  ],
  imports: [
    IonicPageModule.forChild(ApplyJop),
    TranslateModule
  ],
  exports: [
    ApplyJop
  ]
})
export class ContactusModule {}
