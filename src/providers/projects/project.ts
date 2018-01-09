import { AppAPi } from './../app.api';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectsProvider extends AppAPi{

  constructor(public http: Http) {
    super()
  }


  getUserProjects(data) {

    let body = JSON.stringify(data);
    
    return this.http.post(super.API_URL() +'service_orders.php?action=getUserProjects' ,body).map(res=>res.json())
  }

  getProjectDetails(data) {
    
    let body = JSON.stringify(data);
    
    return this.http.post(super.API_URL() +'service_orders.php?action=getProjectDetails' ,body).map(res=>res.json())
  }

  chooseProvider(data) {
    
    let body = JSON.stringify(data);
    
    return this.http.post(super.API_URL() +'service_orders.php?action=chooseProvider' ,body).map(res=>res.json())
  }

  addOffer(data) {
    
    let body = JSON.stringify(data);
    
    return this.http.post(super.API_URL() +'service_orders.php?action=addOffer' ,body).map(res=>res.json())
  }

  deleteOrder(data) {
    
    let body = JSON.stringify(data);
    
    return this.http.post(super.API_URL() +'service_orders.php?action=deleteOrder' ,body).map(res=>res.json())
  }

  getChoosedProviderData(data) {
    
    let body = JSON.stringify(data);
    
    return this.http.post(super.API_URL() +'service_orders.php?action=getChoosedProviderData' ,body).map(res=>res.json())
  }

  AddProjectRating(data) {
    
    let body = JSON.stringify(data);
    
    return this.http.post(super.API_URL() +'service_orders.php?action=AddProjectRating' ,body).map(res=>res.json())
  }


}
