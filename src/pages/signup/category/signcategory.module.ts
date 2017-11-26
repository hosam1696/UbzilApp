import { ComponentsModule } from './../../../components/components.module';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignCategory } from './signcategory';

@NgModule({
  declarations: [
    SignCategory
  ],
  imports: [
    IonicPageModule.forChild(SignCategory),
    TranslateModule,
    ComponentsModule
  ],
  exports: [
    SignCategory
  ]
})
export class DistrictsModule {}
