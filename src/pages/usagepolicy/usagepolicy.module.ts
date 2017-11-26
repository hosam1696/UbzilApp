import { TranslateModule } from 'ng2-translate/ng2-translate';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsagePolicyPage } from './usagepolicy';

@NgModule({
  declarations: [
    UsagePolicyPage,
  ],
  imports: [
    IonicPageModule.forChild(UsagePolicyPage),
    TranslateModule
  ],
})
export class UsagePolicyPageModule {}
