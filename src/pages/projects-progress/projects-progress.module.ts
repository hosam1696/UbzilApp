import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ProjectsProgress} from './projects-progress';
import {TranslateModule} from "ng2-translate";

@NgModule({
  declarations: [
    ProjectsProgress,
  ],
  imports: [
    IonicPageModule.forChild(ProjectsProgress),
    TranslateModule
  ],
  exports: [
    ProjectsProgress
  ]
})
export class SettingsModule {}
