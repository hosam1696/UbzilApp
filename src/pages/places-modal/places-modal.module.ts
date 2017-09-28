import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlacesModalPage } from './places-modal';

@NgModule({
  declarations: [
    PlacesModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PlacesModalPage),
    ComponentsModule
  ],
})
export class PlacesModalPageModule {}
