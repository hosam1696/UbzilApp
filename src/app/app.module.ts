import { Network } from '@ionic-native/network';
import { Push } from '@ionic-native/push';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; 
import { Camera } from '@ionic-native/camera';

//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ErrorHandler, NgModule} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Platform } from 'ionic-angular';
import {Http, HttpModule} from '@angular/http';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {IonicStorageModule} from '@ionic/storage';
import {Geolocation} from '@ionic-native/geolocation';
import { NativeGeocoder } from "@ionic-native/native-geocoder";
import {Ionic2RatingModule} from 'ionic2-rating';
//import {TranslateService} from 'ng2-translate';
//import {TranslateService} from '@ngx-translate/core';
//import { TranslateStore } from "@ngx-translate/core/src/translate.store";

import {MyApp} from './app.component';
import {ListPage} from '../pages/list/list';
import {SearchService} from '../pages/search-service/search-service';
import {SMS} from '../providers/sms';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AppUtilFunctions} from './appglobal/app.utilfuns';
import {AppPlugins} from './appglobal/app.plugins.ts';
import {UserProvider} from '../providers/user/user';
import {ServicesProvider} from '../providers/services/services';
import {MessagesProvider} from '../providers/messages/messages';
import {NotificationsProvider} from '../providers/notifications/notifications';
import { API } from '../providers/api';
import { Components } from '../providers/components';
import {GetLocation} from "../pages/get-location/get-location";
import { MomentModule } from 'angular2-moment';
//import moment from 'moment';
//import 'moment/locale/de';
//moment.locale('ar');
export function createTranslateLoader(http: Http) {
	return new TranslateStaticLoader(http, './assets/i18n', '.json');
}
let platform = new Platform();
@NgModule({
  declarations: [
    MyApp,
    ListPage,
    SearchService,
    GetLocation,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    Ionic2RatingModule,
    MomentModule,
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
    ListPage,
    GetLocation,
    SearchService,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    //BrowserAnimationsModule,
    Geolocation,
    NativeGeocoder,
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
    NotificationsProvider,
    API,
    Components
  ]
})
export class AppModule {}
