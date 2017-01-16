import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SettingsService } from '../settings.service';
import 'rxjs/add/operator/map';

@Injectable()
export class GeocoderService {

  minimumConfidence: number;
  baseUrl:string ;
  authToken: string;
  constructor(private _settings:SettingsService,
              private _http:Http)
  {
      this.minimumConfidence = this._settings.getGeocoderSettings().minimumConfidence;
      this.baseUrl = this._settings.getGeocoderSettings().apiUrl;
      this.authToken = this._settings.getGeocoderSettings().authToken;
  }

  geoCode(address: string) {
      // todo: the auth token should be added to this code.
      console.log("geo: ", this.baseUrl + address+"&json=1");
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

/*
interface GeocodeResult {
    confidence: number;
    lat: number;
    lon: number;
} */

