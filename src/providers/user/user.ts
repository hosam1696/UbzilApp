import { AppAPi } from './../app.api';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/RX'; // for google map 

interface IUserData {
  username: string,
  password: string,
  lang_code:string
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

  editUser(data) {
    let body = JSON.stringify(data);
    console.log('body sent', body);
    return this.http.post(super.API_URL() + 'users.php?action=editUser', body).map(res => res.json());  
  }

  LoginUser(userData: IUserData) {
    let body = JSON.stringify(userData);
    return this.http.post(super.API_URL()+'users.php?action=loginUser', body).map(res=>res.json())
  }


  getPlaces(parentData) {
    let body = JSON.stringify(parentData);  
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
  
  // profile page
  getUserInfo(data) {
    let body = JSON.stringify(data);  
    return this.http.post(super.API_URL() + 'users.php?action=getUserInfo', body).map(res => res.json());  
  }

  // profile page
  getUserInfoRating(data) {
    let body = JSON.stringify(data);  
    return this.http.post(super.API_URL() + 'users.php?action=getUserInfoRating', body).map(res => res.json());  
  }

  // editprofile page
  getUserToEdit(data) {
    let body = JSON.stringify(data);  
    return this.http.post(super.API_URL() + 'users.php?action=getUserToEdit', body).map(res => res.json());  
  }

  addRating(data) {
    let body = JSON.stringify(data);
    return this.http.post(super.API_URL() + 'users.php?action=addOneRating', body).map(res => res.json());  
  }

  // get Rating page
  getRating(data) {
    let body = JSON.stringify(data);
    return this.http.post(super.API_URL() + 'users.php?action=getOneRating', body).map(res => res.json());  
  }

  // get User Balances page
  getUserBalances(data) {
    let body = JSON.stringify(data);
    return this.http.post(super.API_URL() + 'users.php?action=getUserBalances', body).map(res => res.json());  
  }
  
  // get User Balances history
  getBalanceOperations(data) {
    let body = JSON.stringify(data);
    return this.http.post(super.API_URL() + 'users.php?action=getBalanceOperations', body).map(res => res.json());  
  }
  
  // get service that user provide
  getUserServices(data) {
    let body = JSON.stringify(data);
    return this.http.post(super.API_URL() + 'users.php?action=getUserServices', body).map(res => res.json());  
  }

  // get service that user provide
  addSubscription(data) {
    let body = JSON.stringify(data);
    return this.http.post(super.API_URL() + 'users.php?action=addSubscription', body).map(res => res.json());  
  }
  
  // add user work times
  addUserWorkTimes(data) {
    let body = JSON.stringify(data);
    return this.http.post(super.API_URL() + 'users.php?action=addUserWorkTimes', body).map(res => res.json());  
  }

  getUserWorkTimeToEdit(data) {
    let body = JSON.stringify(data);  
    return this.http.post(super.API_URL() + 'users.php?action=getUserWorkTimeToEdit', body).map(res => res.json());  
  }

  // add user booking
  addUserBooking(data) {
    let body = JSON.stringify(data);
    return this.http.post(super.API_URL() + 'users.php?action=addUserBooking', body).map(res => res.json());  
  }

  // get user booking
  getUserBooking(data) {
    let body = JSON.stringify(data);
    return this.http.post(super.API_URL() + 'users.php?action=getUserBooking', body).map(res => res.json());  
  }
  
  // get booking details
  getBookingDetails(data) {
    let body = JSON.stringify(data);
    return this.http.post(super.API_URL() + 'users.php?action=getBookingDetails', body).map(res => res.json());  
  }

  // cancel booking id
  cancelBooking(data) {
    let body = JSON.stringify(data);
    return this.http.post(super.API_URL() + 'users.php?action=cancelBooking', body).map(res => res.json());  
  }

  // delete booking id
  deleteBooking(data) {
    let body = JSON.stringify(data);
    return this.http.post(super.API_URL() + 'users.php?action=deleteBooking', body).map(res => res.json());  
  }

  // send mail call us
  sendMailCallUs(data) {
    let body = JSON.stringify(data);
    return this.http.post(super.API_URL() + 'users.php?action=sendMailCallUs', body).map(res => res.json());  
  }

}
