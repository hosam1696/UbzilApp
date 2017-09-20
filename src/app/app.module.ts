import {BrowserModule} from '@angular/platform-browser';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {Http, HttpModule} from '@angular/http';
import {TranslateLoader, TranslateModule, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {IonicStorageModule} from '@ionic/storage';
import {Geolocation} from '@ionic-native/geolocation';
import {Ionic2RatingModule} from 'ionic2-rating';

import {MyApp} from './app.component';
//import { Tabs } from '../pages/tabs/tabs';
//import { RequestsTabs } from '../pages/requests-tabs/requests-tabs';
import {ListPage} from '../pages/list/list';
//import { Login } from '../pages/login/login';
//import { ForgetPass } from '../pages/forget-pass/forget-pass';
//import { Signup } from '../pages/signup/signup';
//import { HomePage } from '../pages/home/home';
//import { Settings } from '../pages/settings/settings';
//import { Contactus } from '../pages/contactus/contactus';
//import { ProfilePage } from '../pages/profile/profile';
//import { SubCategory } from '../pages/subcategory/subcategory';
//import { SearchResults } from '../pages/search-results/search-results';
//import { Requests } from '../pages/requests/requests';
//import { ExcutedRequests } from '../pages/excuted-requests/excuted-requests';
//import { RecivedRequests } from '../pages/recived-requests/recived-requests';
//import { Messages } from '../pages/messages/messages';
//import { Notifications } from '../pages/notifications/notifications';
//import { EditProfile } from '../pages/edit-profile/edit-profile';
// import { GetLocation } from '../pages/get-location/get-location';
import {SearchOption} from '../pages/search-option/search-option';
//import { MessagesDetail } from '../pages/messages-detail/messages-detail';
//import { AddRequest } from '../pages/add-request/add-request';
// import { PopoverContentPage } from '../pages/popover/popover';
// import { AddReview } from '../pages/addreview/addreview';
//import { RequestsDetail } from '../pages/requests-detail/requests-detail';
import {ApplyJop} from '../pages/applyjop/applyjop';
// import { NotificationsDetail } from '../pages/notifications-detail/notifications-detail';
import {UserList} from '../pages/user-list/user-list';
import {SearchService} from '../pages/search-service/search-service';
import {SMS} from '../providers/sms';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ShrinkingSegmentHeaderComponent} from '../components/shrinking-segment-header/shrinking-segment-header';
import {AppUtilFunctions} from './appglobal/app.utilfuns';
//import { MyBalance } from '../pages/my-balance/my-balance';
//import { BalanceHistory } from '../pages/balance-history/balance-history';
//import { WorkTime } from '../pages/work-time/work-time';
//import { Reservation } from '../pages/reservation/reservation';
//import { PriceList } from '../pages/price-list/price-list';
//import { ProjectsProgress } from '../pages/projects-progress/projects-progress';
//import { ReservationsList } from '../pages/reservations-list/reservations-list';
// import { ConfirmReservation } from '../pages/confirm-reservation/confirm-reservation';

export function createTranslateLoader(http: Http) {
	return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    //Tabs,
    //RequestsTabs,
    ListPage,
    //Login,
    //ForgetPass,
    //Signup,
    //HomePage,
    //Settings,
    //SubCategory,
    //Contactus,
    ShrinkingSegmentHeaderComponent,
   // ProfilePage,
    //SearchResults,
    // Requests,
    //Messages,
    //Notifications,
    //EditProfile,
    // GetLocation,
    SearchOption,
   // MessagesDetail,
    //AddRequest,
    //PopoverContentPage,
    // AddReview,
    //RequestsDetail,
    ApplyJop,
    // RecivedRequests,
    // ExcutedRequests,
    //NotificationsDetail,
    UserList,
    SearchService,
    //MyBalance,
    //BalanceHistory,
    //WorkTime,
    //Reservation,
    //PriceList,
    // ProjectsProgress,
    //ReservationsList,
    //ConfirmReservation
  ],
  imports: [
    BrowserModule,
    HttpModule,
//    BrowserAnimationsModule,
    Ionic2RatingModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    // PopoverContentPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //Tabs,
    //RequestsTabs,
    ListPage,
    //Login,
    //ForgetPass,
    //Signup,
    //HomePage,
    //SubCategory,
    //Settings,
    //Contactus,
    //ProfilePage,
    //SearchResults,
    // Requests,
    //Messages,
    //Notifications,
    //EditProfile,
    // GetLocation,
    SearchOption,
    //MessagesDetail,
    //AddRequest,
    // PopoverContentPage,
    // AddReview,
    //RequestsDetail,
    ApplyJop,
    // RecivedRequests,
    // ExcutedRequests,
    UserList,
    // NotificationsDetail,
    SearchService,
    //MyBalance,
    //BalanceHistory,
    //WorkTime,
    //Reservation,
    //PriceList,
    // ProjectsProgress,
    //ReservationsList,
    //ConfirmReservation
  ],
  providers: [
    StatusBar,
    SplashScreen,
//    BrowserAnimationsModule,
     Geolocation,
     AppUtilFunctions,
    SMS,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
