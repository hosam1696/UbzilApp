import { AppAPi } from './../app.api';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MessagesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MessagesProvider extends AppAPi {

  constructor(public http: Http) {
    super();
  }

  checkIfConversation(data) {
    let body = JSON.stringify(data);
    return this.http.post(super.API_URL() + 'messages.php?action=checkIfConversation', body).map(res => res.json());  
  }

  addConversation(data) {
    let body = JSON.stringify(data);
    return this.http.post(super.API_URL() + 'messages.php?action=addConversation', body).map(res => res.json());  
  }

  getAllConversation(data) {
    let body = JSON.stringify(data);
    return this.http.post(super.API_URL() + 'messages.php?action=getAllConversation', body).map(res => res.json());  
  }

  getConversationMessages(data) {
    let body = JSON.stringify(data);
    return this.http.post(super.API_URL() + 'messages.php?action=getConversationMessages', body).map(res => res.json());  
  }

  getLiveMessages(data) {
    let body = JSON.stringify(data);
    return this.http.post(super.API_URL() + 'messages.php?action=getLiveMessages', body).map(res => res.json());  
  }

}
