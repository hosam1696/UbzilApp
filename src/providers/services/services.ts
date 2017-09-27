import { AppAPi } from './../app.api';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ServicesProvider extends AppAPi{

  constructor(public http: Http) {
    super()
  }


  getHomeServices(servicesData) {

    let body = JSON.stringify(servicesData);

    return this.http.post(super.API_URL() +'home.php?action=getMainServices' ,body).map(res=>res.json())
  }


  getSubCategory(serviceData) {
    let body = JSON.stringify(serviceData);

    return this.http.post(super.API_URL() + 'home.php?action=getSubServices', body).map(res => res.json());
  }


  getServiceProviders(serviceData) {
    
    let body = JSON.stringify(serviceData);

    return this.http.post(super.API_URL() + 'services.php?action=getServiceProviders', body).map(res=>res.json());

  }


  getServiceFormShape(requestData) {
    let body = JSON.stringify(requestData);
    return this.http.post(super.API_URL() +'services.php?action=getServiceformShapes',body).map(res=>res.json())
  }

}
