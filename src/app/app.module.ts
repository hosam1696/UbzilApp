import { Network } from '@ionic-native/network';
import { Push } from '@ionic-native/push';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ErrorHandler, NgModule} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Platform } from 'ionic-angular';
import {Http, HttpModule} from '@angular/http';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {IonicStorageModule} from '@ionic/storage';
import {Geolocation} from '@ionic-native/geolocation';

import {MyApp} from './app.component';

import {ListPage} from '../pages/list/list';

import {SMS} from '../providers/sms';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AppUtilFunctions} from './appglobal/app.utilfuns';
import {AppPlugins} from './appglobal/app.plugins.ts';
import { UserProvider } from '../providers/user/user';
import { ServicesProvider } from '../providers/services/services';
import { MessagesProvider } from '../providers/messages/messages';
import { NotificationsProvider } from '../providers/notifications/notifications';

import { Camera } from '@ionic-native/camera';

export function createTranslateLoader(http: Http) {
	return new TranslateStaticLoader(http, './assets/i18n', '.json');
}
let platform = new Platform();
@NgModule({
  declarations: [
    MyApp,
    ListPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      activator: 'ripple',
      iconMode: 'ios'
      //backButtonIcon: !platform.isRTL ? 'ios-arrow-forward' : 'ios-arrow-back'
    }),
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
    ListPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
//    BrowserAnimationsModule,
     Geolocation,
     AppUtilFunctions,
     AppPlugins,
     Camera,
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
