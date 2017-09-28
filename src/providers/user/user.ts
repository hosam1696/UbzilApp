import { AppAPi } from './../app.api';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

interface IUserData {
  username: string,
  password: string
}

@Injectable()
export class UserProvider extends AppAPi{

  constructor(public http: Http) {
   super()
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

}
