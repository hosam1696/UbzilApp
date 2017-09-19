import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddRequest } from './add-request';

@NgModule({
  declarations: [
    AddRequest,
  ],
  imports: [
    IonicPageModule.forChild(AddRequest),
  ],
  exports: [
    AddRequest
  ]
})
export class IntroModule {}
