import { TranslateModule } from 'ng2-translate/ng2-translate';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Tabs } from './tabs';

@NgModule({
  declarations: [
    Tabs,
  ],
  imports: [
    IonicPageModule.forChild(Tabs),
    TranslateModule
  ],
  exports: [
    Tabs
  ]
})
export class TabsModule {}
