import { TranslateModule } from 'ng2-translate/ng2-translate';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchResults } from './search-results/search-results';

@NgModule({
  declarations: [
    SearchResults,
  ],
  imports: [
    IonicPageModule.forChild(SearchResults),
    TranslateModule
  ],
  exports: [
    SearchResults
  ]
})
export class SettingsModule {}
