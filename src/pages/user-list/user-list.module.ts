import { ComponentsModule } from './../../components/components.module';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserList } from './user-list';

@NgModule({
  declarations: [
    UserList,
  ],
  imports: [
    IonicPageModule.forChild(UserList),
    TranslateModule,
    ComponentsModule
  ],
  exports: [
    UserList
  ]
})
export class UserListModule {}
