import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersListComponent} from './customers/customers-list/customers-list.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { HomeComponent } from './home.component';

const routes:Routes = [
    // todo : this component should navigate based on user's settings.
    // {
    //     path: '',
    //     component: AdminDispatcher
    // ,}
    {
        path: '',
        component: HomeComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

export const AppRouting = RouterModule.forRoot(routes);