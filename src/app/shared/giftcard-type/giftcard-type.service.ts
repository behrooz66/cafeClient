import { Injectable } from '@angular/core';
import { Settings } from '../../settings';
import { HttpAuthService } from '../http-auth.service';

@Injectable()
export class GiftcardTypeService {

  constructor(private _http:HttpAuthService) { }

  getTypes() {
      return this._http.get(Settings.apiBase + "giftcard/types")
          .map(r => r.json());
  }

}
