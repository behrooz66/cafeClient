import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

  // Set all the settings here.

  private apiBase = "http://localhost:5001/api/";
  private tokenEndpoint = "http://localhost:5000/connect/token";
  
  private loginInfo = {
    client_id: "resourceOwner",
    client_secret: "secret",
    scope: "api+offline_access"
  }

  private geocoder = {
      apiUrl: "http://geocoder.ca/?locate=",
      authToken: "xxx",
      minimumConfidence: 0.8
  }

// *********************************************


  constructor() { }

  getApiBase():string{
    return this.apiBase;
  }

  getTokenEndpoint():string{
    return this.tokenEndpoint;
  }

  getLoginInfo():string{
      let str = "grant_type=password"
              +"&client_id="+this.loginInfo.client_id
              +"&client_secret="+this.loginInfo.client_secret
              +"&scope="+this.loginInfo.scope;
      return str;
  }

  getRefreshTokenInfo():string {
      let str = "grant_type=refresh_token"
              +"&client_id="+this.loginInfo.client_id
              +"&client_secret="+this.loginInfo.client_secret
              +"&scope="+this.loginInfo.scope;
      return str;
  }

  getGeocoderSettings(){
      return this.geocoder;
  }
}
