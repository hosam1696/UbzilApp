import { AppAPi } from './../app.api';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ServicesProvider extends AppAPi{

  constructor(public http: Http) {
    super()
  }


  getDefaultServices(servicesData) {

    let body = JSON.stringify(servicesData);

    return this.http.post(super.API_URL() +'home.php?action=getMainServices' ,body).map(res=>res.json())
  }


  getSubDirectory(subData) {
    let body = JSON.stringify(subData);

    return this.http.post(super.API_URL() + 'home.php?action=getSubServices', body).map(res => res.json());
  }

}
