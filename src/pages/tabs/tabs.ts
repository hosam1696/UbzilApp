import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

//import {Login} from '../login/login';
//import {Signup} from '../signup/signup';
//import {HomePage} from '../home/home';
//import {Settings} from '../settings/settings';
//import {ProfilePage} from '../profile/profile';
//import {Messages} from '../messages/messages';
//import { RequestsTabs } from '../requests-tabs/requests-tabs';
//import {Notifications} from "../notifications/notifications";



@IonicPage()
@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class Tabs {

    // Transporter Tabs
    HomeTab = 'HomePage'; // Routes
//    ProfileTab = ProfilePage; // ProfilePage
    RequestsTab = 'RequestsTabs'; // Requests
    MessagesTab = 'Messages';   // Messages
    SettingsTab = 'Settings';   // Settings
    NotificationsTab = 'Notifications';   // Notifications
    constructor(public navCtrl: NavController) {}

}
