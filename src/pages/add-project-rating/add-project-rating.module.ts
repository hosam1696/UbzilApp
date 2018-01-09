import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AddProjectRating} from './add-project-rating';
import {TranslateModule} from "ng2-translate";
import {Ionic2RatingModule} from "ionic2-rating";

@NgModule({
  declarations: [
    AddProjectRating,
  ],
  imports: [
    IonicPageModule.forChild(AddProjectRating),
    TranslateModule,
    Ionic2RatingModule
  ],
  exports: [
    AddProjectRating
  ]
})
export class AddProjectRatingModule{}
