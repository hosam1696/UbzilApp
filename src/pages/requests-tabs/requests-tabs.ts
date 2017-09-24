import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-requests-tabs',
    templateUrl: 'requests-tabs.html',
})
export class RequestsTabs {

    // Transporter Tabs
    RecivedRequestsTab = 'RecivedRequests'; // Routes
    RequestsTab = 'Requests'; // Requests
    ExcutedRequestsTab = 'ExcutedRequests';   // Settings
    ProjectsProgressTab = 'ProjectsProgress';


    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
    ) {
    }

  




}
