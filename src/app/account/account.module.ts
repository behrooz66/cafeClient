import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AccountService } from './account.service';
import { AuthService } from './auth.service';
import { SigninComponent } from './signin/signin.component';
import { SignoutComponent } from './signout/signout.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  declarations: [
      SigninComponent,
      SignoutComponent, 
      SignupComponent,
      ResetPasswordComponent
  ],
  providers: [
      AccountService,
      AuthService
  ]
})
export class AccountModule { }
