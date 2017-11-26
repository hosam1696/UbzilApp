import { ComponentsModule } from './../../components/components.module';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubCategory } from './subcategory';

@NgModule({
  declarations: [
    SubCategory
  ],
  imports: [
    IonicPageModule.forChild(SubCategory),
    TranslateModule,
    ComponentsModule
  ],
  exports: [
    SubCategory
  ]
})
export class DistrictsModule {}
