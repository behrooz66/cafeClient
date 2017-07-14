import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent} from './signin/signin.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { SignoutComponent } from './signout/signout.component';


const routes:Routes = [
    {
        path: 'account/signup',
        component: SignupComponent
    },
    {
        path: 'account/signin',
        component: SigninComponent
    },
    {
        path: 'account/update-password/:mustChangePassword',
        component: UpdatePasswordComponent,
    }, 
    {
        path: 'account/signout',
        component: SignoutComponent
    }
];

export const AccountRouting = RouterModule.forChild(routes);