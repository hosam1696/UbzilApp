import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddReview } from './addreview';

@NgModule({
  declarations: [
    AddReview,
  ],
  imports: [
    IonicPageModule.forChild(AddReview),
  ],
  exports: [
    AddReview
  ]
})
export class DistrictsModule {}
