import { TranslateModule } from 'ng2-translate';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectsPage } from './projects';
import { MomentModule } from 'angular2-moment';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    ProjectsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectsPage),
    TranslateModule,
    MomentModule,
    ComponentsModule
  ]
})
export class ProjectsPageModule {}
