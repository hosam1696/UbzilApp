import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExcutedRequests } from './excuted-requests';

@NgModule({
  declarations: [
    ExcutedRequests,
  ],
  imports: [
    IonicPageModule.forChild(ExcutedRequests),
  ],
  exports: [
    ExcutedRequests
  ]
})
export class SettingsModule {}
