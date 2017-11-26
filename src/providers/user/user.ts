import { AppAPi } from './../app.api';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/RX'; // for google map 

interface IUserData {
  username: string,
  password: string
}

@Injectable()
export class UserProvider extends AppAPi{

  constructor(public http: Http) {
   super()
  }
  
  getUserIP() {
    return this.http.get('http://ipv4.myexternalip.com/json').map(res=>res.json());
  }

  getUserLocayionInfoByIp(ip) {
    return (ip) ? this.http.get('http://ipinfo.io/' + ip).map(res=>res.json()) : null;
  }
  
  getConfirmCode(data) {
    let body = JSON.stringify(data);
    //console.log(body);
    return this.http.post(super.API_URL() + 'users.php?action=getConfirmCode', body).map(res => res.json());  
  }
  
  checkUnique(data) {
    let body = JSON.stringify(data);
    //console.log('body sent', body);
    return this.http.post(super.API_URL() + 'users.php?action=checkUnique', body).map(res => res.json());  
  }
  
  addNewUser(data) {
    let body = JSON.stringify(data);
    console.log('body sent', body);
    return this.http.post(super.API_URL() + 'users.php?action=addNewUser', body).map(res => res.json());  
  }

  LoginUser(userData: IUserData) {
    let body = JSON.stringify(userData);
    return this.http.post(super.API_URL()+'users.php?action=loginUser', body).map(res=>res.json())
  }


  getPlaces(parentData) {
    let body = JSON.stringify(parentData);
  
  /*  { "user_id":"3", "parent":"327", "verifycode":"$2y$12$XQBdOjshGvoSRcT6uTlJaOkOiV.htMTyyT09IXxdjHrSQeoc/vgkO", "lang_code":"ar" }*/
  
    return this.http.post(super.API_URL() + 'places.php?action=getPlaces', body).map(res => res.json());  
  }

  getGovOrSector(parentData) {
    let body = JSON.stringify(parentData);  
    return this.http.post(super.API_URL() + 'places.php?action=getGovOrSector', body).map(res => res.json());  
  }

  getAllCities(data) {
    let body = JSON.stringify(data);  
    return this.http.post(super.API_URL() + 'places.php?action=getAllcities', body).map(res => res.json());  
  }


}
