import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchResults } from './search-results/search-results';

@NgModule({
  declarations: [
    SearchResults,
  ],
  imports: [
    IonicPageModule.forChild(SearchResults),
  ],
  exports: [
    SearchResults
  ]
})
export class SettingsModule {}
