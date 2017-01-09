import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class AccountService {

  constructor(private _http:Http) {
  }

  emailAlreadyRegistered(email:string){
      return this._http.get("https://jsonplaceholder.typicode.com/users/3")
          .map(res => res.json());
  }

  userexists(){
      this._http.get("https://jsonplaceholder.typicode.com/users/1")
          .map(res => res.json());
  }

}
