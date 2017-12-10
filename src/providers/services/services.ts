import { AppAPi } from './../app.api';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


// interface IServiceOrderData {
//   username: string,
//   password: string
// }

@Injectable()
export class ServicesProvider extends AppAPi{

  constructor(public http: Http) {
    super()
  }


  getHomeServices(servicesData) {

    let body = JSON.stringify(servicesData);
    
    return this.http.post(super.API_URL() +'home.php?action=getHomeServices' ,body).map(res=>res.json())
  }
  
  // getSignupMainCategory(serviceData) {
  //   let body = JSON.stringify(serviceData);

  //   return this.http.post(super.API_URL() + 'services.php?action=getMainServices', body).map(res => res.json());
  // }

  getSubCategory(serviceData) {
    let body = JSON.stringify(serviceData);

    return this.http.post(super.API_URL() + 'home.php?action=getSubServices', body).map(res => res.json());
  }


  getServiceProviders(serviceData) {
    
    let body = JSON.stringify(serviceData);
    //console.log('bOOOOOOOOOdy', body)
    return this.http.post(super.API_URL() + 'services.php?action=getServiceProviders', body).map(res=>res.json());

  }


  getServiceFormShape(requestData) {
    let body = JSON.stringify(requestData);
    return this.http.post(super.API_URL() +'services.php?action=getServiceformShapes',body).map(res=>res.json())
  }

  addServiceOrders(orderData) {
    let body = JSON.stringify(orderData);
    return this.http.post(super.API_URL()+'service_orders.php?action=addServiceOrders', body).map(res=>res.json())
  }

  getAnalysis(data) {
    let body = JSON.stringify(data);
    return this.http.post(super.API_URL() + 'services.php?action=getAnalysis', body).map(res=>res.json());

  }

  addAnalysisPrice(data) {
    let body = JSON.stringify(data);
    return this.http.post(super.API_URL() + 'services.php?action=addAnalysisPrice', body).map(res=>res.json());

  }


}
