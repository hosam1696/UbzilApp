import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchService } from './search-service';

@NgModule({
  declarations: [
    SearchService,
  ],
  imports: [
    IonicPageModule.forChild(SearchService),
  ],
  exports: [
    SearchService
  ]
})
export class DistrictsModule {}
