import { Component, OnInit } from '@angular/core';
//import { SettingsService } from '../../settings.service';
import { Settings } from '../../settings';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [AuthService]
})
export class SigninComponent implements OnInit {

  error: boolean = false;
  success: boolean = false;
  tokenEndPoint:string;
  username: string;
  password: string;
  
  constructor(private _auth:AuthService) { }

  ngOnInit() {
      this.tokenEndPoint = Settings.tokenEndpoint;
  }

  signin(){
      this.success = false;
      this.error = false;
      this._auth.login(this.username, this.password)
                .subscribe(d => {
                    console.log(d);
                    this.success = true;
                },
                d => {
                    this.error = true
                });
  }

}
