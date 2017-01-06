import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';

const routes:Routes = [
    // todo : this component should navigate based on user's settings.
    // {
    //     path: '',
    //     component: AdminDispatcher
    // ,}
    {
        path: 'customers',
        component: CustomersListComponent
    },
    {
        path: 'customers/:id',
        component: CustomerDetailsComponent
    },
];

export const CustomerRouting = RouterModule.forChild(routes);