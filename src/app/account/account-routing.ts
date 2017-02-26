import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent} from './signin/signin.component';
//import { CustomerDetailsComponent } from './customer-details/customer-details.component';

const routes:Routes = [
    // todo : this component should navigate based on user's settings.
    // {
    //     path: '',
    //     component: AdminDispatcher
    // ,}
    {
        path: 'account/signup',
        component: SignupComponent
    },
    {
        path: 'account/signin',
        component: SigninComponent
    }
];

export const AccountRouting = RouterModule.forChild(routes);