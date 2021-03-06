import { Injectable, Injector, Inject } from '@angular/core';
import { Http, ConnectionBackend, RequestOptions, RequestOptionsArgs, Response, Request, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { AuthService } from '../account/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpAuthService extends Http {

  _authService: AuthService;
  _router: Router;
  constructor(router:Router, injector:Injector, authService:AuthService){
      let _http = injector.get(Http);
      super(_http._backend, _http._defaultOptions);
      this._authService = authService;
      this._router = router;
  }

  
  // overriding all the HTTP methods, adding the fuctionality to:
  /* 1. Add the current token to the header and try
     2. If 401, refresh the token, add the new token to the header and try
     3. If refresh fails, redirect to login
  */
  
  get(url:string, options?:RequestOptions):Observable<Response>
  {    
       return super.get(url, this.getAuthorizedOptions())
       .catch(err => {
          if (err && err.status === 401){
              return this._authService.refreshToken()
                .flatMap(r =>
                    super.get(url, this.getAuthorizedOptions())
                )
                .catch(err2 => {
                    this.redirect();
                    return Observable.throw(err2);
                });
          }
          else {
              return Observable.throw(err);
          }
      });      
  }

  post(url:string, body:any, options?:RequestOptions):Observable<Response>
  {
      return super.post(url, body, this.getAuthorizedOptions())
        .catch(err => {
            if (err && err.status === 401) {
                return this._authService.refreshToken()
                    .flatMap(r => 
                        super.post(url, body, this.getAuthorizedOptions())
                    ).catch(err2 => {
                        this.redirect();
                        return Observable.throw(err2);
                    });
            }   
            else {
                return Observable.throw(err);
            }
        });
  }

  put(url: string, body: any, options?:RequestOptions)
  {
      return super.put(url, body, this.getAuthorizedOptions())
        .catch(err => {
            if (err && err.status === 401) {
                return this._authService.refreshToken()
                    .flatMap(r => 
                        super.put(url, body, this.getAuthorizedOptions())
                    ).catch(err2 => {
                        this.redirect();
                        return Observable.throw(err2);
                    });
            }   
            else {
                return Observable.throw(err);
            }
        });
        
  }

  delete(url: string, options?:RequestOptionsArgs) 
  {
       return super.delete(url, this.getAuthorizedOptions())
       .catch(err => {
          if (err && err.status === 401){
              return this._authService.refreshToken()
                .flatMap(r =>
                    super.delete(url, this.getAuthorizedOptions())
                )
                .catch(err2 => {
                    this.redirect();
                    return Observable.throw(err2);
                });
          }
          else {
              return Observable.throw(err);
          }
      });      
  }


//****** this piece of shit caused a whole lot of trouble as it interfered with other HTTP methods! I know right?!
//   request(url:string | Request, options?:RequestOptions)
//   {
//       return super.request(url, this.getAuthorizedOptions())
//           .catch(err => {
//               if (err && err.status === 401) {
//                   return this._authService.refreshToken()
//                     .flatMap(r => 
//                         super.request(url, this.getAuthorizedOptions())
//                     ).catch(err2 => {
//                         this.redirect();
//                         return Observable.throw(err2)
//                     });
//               }
//               else {
//                   return Observable.throw(err);
//               }
//           });
//   }


  private getAuthorizedOptions():RequestOptions
  {
      let token = this._authService.getAccessToken();
      let header = new Headers({
        'Authorization': 'Bearer '+ token
      });
      let ro = new RequestOptions({
        headers: header
      });
      let options = new RequestOptions();
      if (options.headers) options.headers.delete("Authorization");
      options.headers = header;
      return options;
  }

  private redirect() {
      // todo : code the redirect to login and refactor the name
      this._router.navigate(["/account/signin"]);
  }




}
