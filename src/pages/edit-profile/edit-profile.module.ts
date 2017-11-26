import { TranslateModule } from 'ng2-translate/ng2-translate';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProfile  } from './edit-profile';

@NgModule({
  declarations: [
    EditProfile,
  ],
  imports: [
    IonicPageModule.forChild(EditProfile),
    TranslateModule
  ],
  exports: [
    EditProfile
  ]
})
export class SettingsModule {}
