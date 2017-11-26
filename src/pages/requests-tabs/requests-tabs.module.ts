import { TranslateModule } from 'ng2-translate/ng2-translate';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestsTabs } from './requests-tabs';

@NgModule({
  declarations: [
    RequestsTabs,
  ],
  imports: [
    IonicPageModule.forChild(RequestsTabs),
    TranslateModule
  ],
  exports: [
    RequestsTabs
  ]
})
export class TabsModule {}
