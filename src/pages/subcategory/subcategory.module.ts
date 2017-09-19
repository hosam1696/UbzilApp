import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubCategory } from './subcategory';

@NgModule({
  declarations: [
    SubCategory,
  ],
  imports: [
    IonicPageModule.forChild(SubCategory),
  ],
  exports: [
    SubCategory
  ]
})
export class DistrictsModule {}
