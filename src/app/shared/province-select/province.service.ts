import { Injectable } from '@angular/core';
import { HttpAuthService } from '../http-auth.service';
import { Settings } from '../../settings';


@Injectable()
export class ProvinceService {

  constructor(private _http:HttpAuthService) {
  }

  getProvinces(id){
      return this._http.get(Settings.apiBase + "province/getByCountry?countryId=" + id)
                .map(res => res.json());
  }

}
