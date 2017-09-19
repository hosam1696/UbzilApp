import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectsProgress } from './projects-progress';

@NgModule({
  declarations: [
    ProjectsProgress,
  ],
  imports: [
    IonicPageModule.forChild(ProjectsProgress),
  ],
  exports: [
    ProjectsProgress
  ]
})
export class SettingsModule {}
