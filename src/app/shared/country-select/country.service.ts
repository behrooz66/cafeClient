import { Injectable } from '@angular/core';
import { HttpAuthService } from '../http-auth.service';
import { Settings } from '../../settings';

@Injectable()
export class CountryService {

  constructor(private _http: HttpAuthService) {

  }

  getCountries() {
      console.log(Settings.apiBase + 'country/get');
      return this._http.get(Settings.apiBase + 'country/get')
            .map(res => res.json());
  }

}
