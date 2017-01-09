import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from './customValidators';
import { AccountService } from '../account.service';
 
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AccountService]
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(fb: FormBuilder, private _accountService:AccountService) {
      console.log(this._accountService);
      this.signupForm = fb.group({
          email: ['', Validators.compose([
                  Validators.required, 
                  CustomValidators.invalidEmail
                ]),
                  new CustomValidators(this._accountService).emailAlreadyRegistered.bind(this)
              ],
          password: ['', Validators.required],
          confirmPassword : ['', Validators.required]
      });
  }

  ngOnInit() {
  }

  onSubmit($event){
    console.log(this.signupForm);
  }

}
