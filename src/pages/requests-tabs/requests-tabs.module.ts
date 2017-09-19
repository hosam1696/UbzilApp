import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestsTabs } from './requests-tabs';

@NgModule({
  declarations: [
    RequestsTabs,
  ],
  imports: [
    IonicPageModule.forChild(RequestsTabs),
  ],
  exports: [
    RequestsTabs
  ]
})
export class TabsModule {}
