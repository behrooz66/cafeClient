import { Injectable } from '@angular/core';
import { HttpAuthService } from '../http-auth.service';
import { Settings } from '../../settings';

@Injectable()
export class CityService {
  
  constructor(private _http: HttpAuthService) { }

  
  getCountries() 
  {
      console.log(Settings.apiBase + 'country/get');
      return this._http.get(Settings.apiBase + 'country/get')
            .map(res => res.json());
  }
  
  getProvinces(id)
  {
      return this._http.get(Settings.apiBase + "province/getByCountry?countryId=" + id)
                .map(res => res.json());
  }
  
  getCities(id)
  {
      return this._http.get(Settings.apiBase + "city/getByProvince?provinceId=" + id)
                    .map(res => res.json());
  }

  getCity(id: number) 
  {
      return this._http.get(Settings.apiBase + "city/get/" + id.toString())
            .map(res => res.json());
  }

}
