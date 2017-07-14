import { Component, OnInit } from '@angular/core';
//import { SettingsService } from '../../settings.service';
import { Settings } from '../../settings';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [
      AuthService
  ]
})
export class SigninComponent implements OnInit {

  error: boolean = false;
  success: boolean = false;
  tokenEndPoint:string;
  username: string;
  password: string;
  
  constructor(private _auth:AuthService,
              private _router: Router) { }

  ngOnInit() {
      this.tokenEndPoint = Settings.tokenEndpoint;
  }

  signin(){
      this.success = false;
      this.error = false;
      this._auth.login(this.username, this.password)
                .subscribe(d => {
                    this.success = true;
                    if (this.parseJwt(d["access_token"]).mustChangePassword === "True")
                        this._router.navigate(['/account/update-password', 'True'])
                    else 
                        this._router.navigate(['/customers'])
                },
                d => {
                    this.error = true
                });
  }

  private parseJwt (token:string) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
  }; 

}
