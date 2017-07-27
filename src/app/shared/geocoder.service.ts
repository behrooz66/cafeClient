import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Settings } from '../settings';
//import { SettingsService } from '../settings.service';
import 'rxjs/add/operator/map';

@Injectable()
export class GeocoderService {

  minimumConfidence: number;
  baseUrl:string ;
  authToken: string;
  constructor(
              private _http:Http)
  {
      this.minimumConfidence = Settings.geocoder.minimumConfidence;
      this.baseUrl = Settings.geocoder.apiUrl;
      this.authToken = Settings.geocoder.authToken;
  }

  geoCode(address: string) {
      // todo: the auth token should be added to this code.
      return this._http.get(this.baseUrl + address+"&json=1")
          .map(res => res.json())
          .map(res => {
              let x = {
                  confidence: res.standard.confidence,
                  lat: res.latt,
                  lon: res.longt 
              }
              return x;
          });
  }

}