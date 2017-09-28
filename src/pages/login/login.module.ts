import { ComponentsModule } from './../../components/components.module';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Login } from './login';

@NgModule({
  declarations: [
    Login,
  ],
  imports: [
    IonicPageModule.forChild(Login),
    TranslateModule,
    ComponentsModule
  ],
  exports: [
    Login
  ]
})
export class LoginModule {}
