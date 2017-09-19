import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyJop } from './applyjop';

@NgModule({
  declarations: [
    ApplyJop,
  ],
  imports: [
    IonicPageModule.forChild(ApplyJop),
  ],
  exports: [
    ApplyJop
  ]
})
export class ContactusModule {}
