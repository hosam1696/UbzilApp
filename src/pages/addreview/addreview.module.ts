import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AddReview} from './addreview';
import {TranslateModule} from "ng2-translate";
import {Ionic2RatingModule} from "ionic2-rating";

@NgModule({
  declarations: [
    AddReview,
  ],
  imports: [
    IonicPageModule.forChild(AddReview),
    TranslateModule,
    Ionic2RatingModule
  ],
  exports: [
    AddReview
  ]
})
export class AddreviewModule{}
