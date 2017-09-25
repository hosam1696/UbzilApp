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

}
