import { ComponentsModule } from './../../components/components.module';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    TranslateModule,
    ComponentsModule

  ],
  exports: [
    HomePage
  ]
})
export class PassengerHomeModule {}
