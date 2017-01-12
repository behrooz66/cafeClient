import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, ConnectionBackend, XHRBackend,RequestOptions } from '@angular/http';
import { HttpAuthService } from '../shared/http-auth.service';
//import { SharedModule } from '../shared/shared.module';
import { SettingsService } from '../settings.service';

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
    HttpModule,
    //SharedModule
  ],
  declarations: [
      SigninComponent,
      SignoutComponent, 
      SignupComponent,
      ResetPasswordComponent,
  ],
  providers: [
      SettingsService
  ],
})
export class AccountModule { }
