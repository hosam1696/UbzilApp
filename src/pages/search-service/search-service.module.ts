import { TranslateModule } from 'ng2-translate/ng2-translate';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchService } from './search-service';

@NgModule({
  declarations: [
    SearchService,
  ],
  imports: [
    IonicPageModule.forChild(SearchService),
    TranslateModule
  ],
  exports: [
    SearchService
  ]
})
export class DistrictsModule {}
