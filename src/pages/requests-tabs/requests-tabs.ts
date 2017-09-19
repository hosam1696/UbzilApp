import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import { ExcutedRequests } from '../excuted-requests/excuted-requests';
import { RecivedRequests } from '../recived-requests/recived-requests';
import { ProjectsProgress } from '../projects-progress/projects-progress';
import {Requests} from '../requests/requests';

@IonicPage()
@Component({
    selector: 'page-requests-tabs',
    templateUrl: 'requests-tabs.html',
})
export class RequestsTabs {

    // Transporter Tabs
    RecivedRequestsTab = RecivedRequests; // Routes
    RequestsTab = Requests; // Requests
    ExcutedRequestsTab = ExcutedRequests;   // Settings
    ProjectsProgressTab = ProjectsProgress;
    Token: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
    ) {
    }

    ionViewDidLoad() {
        console.log('request tabs viewdidload')
    }

    ionViewDidEnter() {
        console.log('request tabs viewdidenter')
    }




}
