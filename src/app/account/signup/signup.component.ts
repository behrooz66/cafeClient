import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from './customValidators';
import { Request, RequestOptions, RequestOptionsArgs, Headers} from '@angular/http';
import { HttpAuthService } from '../../shared/http-auth.service';
import { AuthService } from '../auth.service';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [HttpAuthService]
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
      this._auth.login("behrooz66", "bbcliqa")
          .subscribe(data => {
              console.log("data came in");
          });
  }

  refreshToken(){
    this._auth.refreshToken();
  }

  getApi(){
      this._http.get('http://localhost:5001/api/values')
          .map(res => res.json())
          .subscribe(d => console.log(d),
                    e => console.log("error: ", e));
  }

  onSubmit($event){
    console.log(this.signupForm);
  }

}
