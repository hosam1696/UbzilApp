import { ComponentsModule } from './../../components/components.module';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlacesModalPage } from './places-modal';

@NgModule({
  declarations: [
    PlacesModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PlacesModalPage),
    TranslateModule,
    ComponentsModule
  ],
})
export class PlacesModalPageModule {}
