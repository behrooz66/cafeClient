import { Injectable } from '@angular/core';
import { SettingsService } from '../settings.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {


  constructor(private _settings:SettingsService, private _http:Http) { }

  login(username: string, password: string){
      console.log("requesting token...");
      let body = this._settings.getLoginInfo()
                +"&username="+username
                +"&password="+password;
      let header = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
      });
      let ro:RequestOptions = new RequestOptions({
          headers: header
      });
      this._http.post(this._settings.getTokenEndpoint(), body, ro)
          .map(res => res.json())
          .subscribe(d => {
              localStorage.setItem('bdAccessToken', d.access_token);
              localStorage.setItem('bdRefreshToken', d.refresh_token);
              localStorage.setItem('bdUserId', this.parseJwt(d.access_token).sub);
              localStorage.setItem('bdUsername', this.parseJwt(d.access_token).preferred_username);
              this.saveRoles(d.access_token);
              //console.log(this.parseJwt(d.access_token));
              console.log("Token obtained");
          }, 
          err => {
              console.log("token failed", err);
          });
  }

  refreshToken(){
      console.log("refreshing token...");
      let refToken: string = localStorage.getItem("bdRefreshToken");
      let username: string = localStorage.getItem("bdUsername");
      let body = this._settings.getRefreshTokenInfo()
                +"&username="+username
                +"&refresh_token="+refToken;
      let header = new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
      });
      let ro:RequestOptions = new RequestOptions({
          headers: header
      });
      if (refToken && refToken.length > 1)
         this._http.post(this._settings.getTokenEndpoint(), body, ro)
            .map(res => res.json())
            .subscribe(d => {
                localStorage.setItem('bdAccessToken', d.access_token);
              localStorage.setItem('bdRefreshToken', d.refresh_token);
              localStorage.setItem('bdUserId', this.parseJwt(d.access_token).sub);
              localStorage.setItem('bdUsername', this.parseJwt(d.access_token).preferred_username);
              this.saveRoles(d.access_token);
              console.log("token refreshed!");
            },
                err => console.log("refresh failed", err)
            );
  }

  getAccessToken(){
      let at = localStorage.getItem("bdAccessToken");
      return at;
  }

  private parseJwt (token:string) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
  }; 

  private saveRoles(jwt){
      let parsed = this.parseJwt(jwt);
      localStorage.setItem("role", parsed.role);
  }

}