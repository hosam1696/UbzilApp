import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {PopoverContentPage} from './popover';
import {TranslateModule} from "ng2-translate";

@NgModule({
  declarations: [
    PopoverContentPage,
  ],
  imports: [
    IonicPageModule.forChild(PopoverContentPage),
    TranslateModule
  ],
  exports: [
    PopoverContentPage
  ]
})
export class PopoverContentPageModule {}
