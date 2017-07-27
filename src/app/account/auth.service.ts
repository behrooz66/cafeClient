import { Injectable } from '@angular/core';
//import { SettingsService } from '../settings.service';
import { Settings } from '../settings';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Subject } from "rxjs/Subject";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {

  private isLoggedIn: boolean = false;
  private loggedIn = new BehaviorSubject<boolean>(false);


  isUserLoggedIn(): Observable<boolean> 
  {
      return this.loggedIn.asObservable();
  }


  constructor(private _http:Http) 
  {
      this.isLoggedIn = localStorage.getItem('bdUsername') ? true: false;
      this.loggedIn.next(this.isLoggedIn);
  }

  login(username: string, password: string): Observable<Response>
  {
      let body = "grant_type=password"
                +"&client_id=" + Settings.loginInfo.client_id
                +"&client_secret=" + Settings.loginInfo.client_secret
                +"&scope=" + Settings.loginInfo.scope
                +"&username=" + username
                +"&password=" + password;
      let header = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
      });
      let ro:RequestOptions = new RequestOptions({
          headers: header
      });
      return this._http.post(Settings.tokenEndpoint, body, ro)
          //.map(res => res.json())
          .map(res => {
              let d = res.json(); 
              localStorage.setItem('bdAccessToken', d.access_token);
              localStorage.setItem('bdRefreshToken', d.refresh_token);
              localStorage.setItem('bdUserId', this.parseJwt(d.access_token).sub);
              localStorage.setItem('bdUsername', this.parseJwt(d.access_token).preferred_username);
              localStorage.setItem('bdCity', this.parseJwt(d.access_token).city);
              localStorage.setItem('bdCityId', this.parseJwt(d.access_token).cityId);
              localStorage.setItem('bdProvince', this.parseJwt(d.access_token).province);
              localStorage.setItem('bdRestaurant', this.parseJwt(d.access_token).restaurantId);
                //localStorage.setItem('bdMustChangePassword', this.parseJwt(d.access_token).mustChangePassword);
              this.saveRoles(d.access_token);

              this.isLoggedIn = true;  
              this.loggedIn.next(this.isLoggedIn);
              
              return d;
          })
          .catch(error => {
              this.clearAuthData();
              return Observable.throw(error)
          });
  }

  refreshToken():Observable<Response>
  {
      let refToken: string = localStorage.getItem("bdRefreshToken");
      let username: string = localStorage.getItem("bdUsername");
      let body = "grant_type=refresh_token"
                +"&client_id=" + Settings.loginInfo.client_id
                +"&client_secret=" + Settings.loginInfo.client_secret
                +"&scope=" + Settings.loginInfo.scope
                +"&username="+username
                +"&refresh_token="+refToken;
      let header = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
      });
      let ro:RequestOptions = new RequestOptions({
          headers: header
      });
      return this._http.post(Settings.tokenEndpoint, body, ro)
          //.map(res => res.json())
          .map(data => {
                let d = data.json();
                localStorage.setItem('bdAccessToken', d.access_token);
                localStorage.setItem('bdRefreshToken', d.refresh_token);
                localStorage.setItem('bdUserId', this.parseJwt(d.access_token).sub);
                localStorage.setItem('bdUsername', this.parseJwt(d.access_token).preferred_username);
                localStorage.setItem('bdCity', this.parseJwt(d.access_token).city);
                localStorage.setItem('bdCityId', this.parseJwt(d.access_token).cityId);
                localStorage.setItem('bdProvince', this.parseJwt(d.access_token).province);
                localStorage.setItem('bdRestaurant', this.parseJwt(d.access_token).restaurantId);
                //localStorage.setItem('bdMustChangePassword', this.parseJwt(d.access_token).mustChangePassword);
                this.saveRoles(d.access_token);

                this.isLoggedIn = true;
                this.loggedIn.next(this.isLoggedIn);
                
                return data;
            }
       )
       .catch(error => {
            this.logout();
            return Observable.throw(error)
       });
  }
  
  getAccessToken()
  {
      let at = localStorage.getItem("bdAccessToken");
      return at;
  }

  logout()
  {
      localStorage.clear();
      this.isLoggedIn = false;
      this.loggedIn.next(this.isLoggedIn);
  }

  private parseJwt (token:string) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
  }; 

  private saveRoles(jwt){
      let parsed = this.parseJwt(jwt);
      localStorage.setItem("bdRole", parsed.role);
  }

  private clearAuthData(){
      localStorage.removeItem("bdAccessToken");
      localStorage.removeItem("bdRefreshToken");
      localStorage.removeItem("bdUserId");
      localStorage.removeItem("bdUsername");
      localStorage.removeItem("bdRole");
      localStorage.removeItem("bdCity");
      localStorage.removeItem("bdCityId");
      localStorage.removeItem("bdProvince");
      localStorage.removeItem("bdCountry");
      localStorage.removeItem("bdRestaurant");
  }

  //****  */
  getRole(): string {
        let r = localStorage.getItem("bdRole"); 
        return r;
  }

  getUsername(): string {
      let u = localStorage.getItem("bdUsername"); 
      return u;
  }   

  getUserId(): string {
      let u = localStorage.getItem("bdUserId"); 
      return u;
  }

  isManager() {
        let r = localStorage.getItem("bdRole"); 
        if (this.isLoggedIn && r === "Manager")
            return true;
        return false;
  }

  isEmployee() {
        let r = localStorage.getItem("bdRole"); 
        if (this.isLoggedIn && r === "Employee")
            return true;
        return false;
  }

  isAdmin() {
        let r = localStorage.getItem("bdRole"); 
        if (this.isLoggedIn && r === "Admin")
            return true;
        return false;
  }



}