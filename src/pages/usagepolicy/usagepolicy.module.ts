import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsagePolicyPage } from './usagepolicy';

@NgModule({
  declarations: [
    UsagePolicyPage,
  ],
  imports: [
    IonicPageModule.forChild(UsagePolicyPage),
  ],
})
export class UsagePolicyPageModule {}
