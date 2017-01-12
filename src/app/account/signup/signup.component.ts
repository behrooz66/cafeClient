import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from './customValidators';
import { HttpAuthService } from '../../shared/http-auth.service';
import { AuthService } from '../auth.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [HttpAuthService, AuthService]
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(fb: FormBuilder, 
              private _http:HttpAuthService,
              private _auth:AuthService) {
      this.signupForm = fb.group({
          email: ['', Validators.compose([
                  Validators.required, 
                  CustomValidators.invalidEmail
                ]),
                  //new CustomValidators(this._accountService).emailAlreadyRegistered.bind(this)
              ],
          password: ['', Validators.required],
          confirmPassword : ['', Validators.required]
      });

  }

  ngOnInit() {
      
  }


  authTest(){
      this._auth.login("behrooz66", "bbcliqa");
  }

  refreshToken(){
    this._auth.refreshToken();
  }

  getApi(){
    this._http.get("http://localhost:5001/api/values")
          .map(r => r.json())
          .subscribe(d => console.log(d));
  }

  onSubmit($event){
    console.log(this.signupForm);
  }

}
