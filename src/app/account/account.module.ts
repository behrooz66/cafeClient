import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, Http, ConnectionBackend, XHRBackend,RequestOptions } from '@angular/http';
import { HttpAuthService } from '../shared/http-auth.service';
import { SharedModule } from '../shared/shared.module';
import { FlashMessageService } from '../shared/flash-message/flash-message.service'


import { AuthService } from './auth.service';
import { SigninComponent } from './signin/signin.component';
import { SignoutComponent } from './signout/signout.component';
import { SignupComponent } from './signup/signup.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
      SigninComponent,
      SignoutComponent, 
      SignupComponent,
      UpdatePasswordComponent,
  ],
  providers: [
      
  ],
})
export class AccountModule { }
