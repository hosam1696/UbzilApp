import { TranslateModule } from 'ng2-translate/ng2-translate';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Messages } from './messages';
import { MomentModule } from 'angular2-moment';
import { ComponentsModule } from './../../components/components.module';
@NgModule({
  declarations: [
    Messages,
  ],
  imports: [
    IonicPageModule.forChild(Messages),
    TranslateModule,
    MomentModule,
    ComponentsModule
  ],
  exports: [
    Messages
  ]
})
export class SettingsModule {}
