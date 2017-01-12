import { Injectable, Injector } from '@angular/core';
import { Http, ConnectionBackend, RequestOptions, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { AuthService } from '../account/auth.service';

@Injectable()
export class HttpAuthService extends Http {

  _authService: AuthService;
  constructor(injector:Injector, authService:AuthService){
      let _http = injector.get(Http);
      super(_http._backend, _http._defaultOptions);
      this._authService = authService;
  }

  get(url:string, options?:RequestOptions):Observable<Response>
  {
      let token = this._authService.getAccessToken();
      
      let header = new Headers({
        'Authorization': 'Bearer '+ token
      });
      let ro = new RequestOptions({
        headers: header
      });
      return super.get(url, ro);
  }




}
