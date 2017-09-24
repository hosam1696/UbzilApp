import { Network } from '@ionic-native/network';
import { Push } from '@ionic-native/push';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; 
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {Http, HttpModule} from '@angular/http';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {IonicStorageModule} from '@ionic/storage';
import {Geolocation} from '@ionic-native/geolocation';
import {Ionic2RatingModule} from 'ionic2-rating';

import {MyApp} from './app.component';

import {ListPage} from '../pages/list/list';

import {UserList} from '../pages/user-list/user-list';
import {SearchService} from '../pages/search-service/search-service';
import {SMS} from '../providers/sms';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AppUtilFunctions} from './appglobal/app.utilfuns';
import { UserProvider } from '../providers/user/user';
import { ServicesProvider } from '../providers/services/services';
import { MessagesProvider } from '../providers/messages/messages';
import { NotificationsProvider } from '../providers/notifications/notifications';

export function createTranslateLoader(http: Http) {
	return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    UserList,
    SearchService,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    Ionic2RatingModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    UserList,
    SearchService,

  ],
  providers: [
    StatusBar,
    SplashScreen,
//    BrowserAnimationsModule,
     Geolocation,
     AppUtilFunctions,
     Network,
     Push,
    SMS,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    ServicesProvider,
    MessagesProvider,
    NotificationsProvider
  ]
})
export class AppModule {}
