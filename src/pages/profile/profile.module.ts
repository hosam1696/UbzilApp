import { TranslateModule } from 'ng2-translate/ng2-translate';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { ComponentsModule } from './../../components/components.module';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    TranslateModule,
    ComponentsModule,
    MomentModule
  ],
  exports: [
    ProfilePage
  ],
  providers: [
    InAppBrowser
  
  ]
})
export class ProfilePageModule {}
