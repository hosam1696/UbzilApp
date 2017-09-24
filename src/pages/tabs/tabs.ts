import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-tabs',
    templateUrl: 'tabs.html',
})
export class Tabs {

    // Transporter Tabs
    HomeTab = 'HomePage'; // Routes
//    ProfileTab = ProfilePage; // ProfilePage
    RequestsTab = 'ProjectsPage'; // Requests
    MessagesTab = 'Messages';   // Messages
    SettingsTab = 'Settings';   // Settings
    NotificationsTab = 'Notifications';   // Notifications
    constructor(public navCtrl: NavController) {}

}
