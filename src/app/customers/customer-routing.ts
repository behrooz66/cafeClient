import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';

const routes:Routes = [
    // todo : this component should navigate based on user's settings.
    // {
    //     path: '',
    //     component: AdminDispatcher
    // ,}
    {
        path: 'customers/add',
        component: CustomerAddComponent
    },
    {
        path: 'customers/edit/:id',
        component: CustomerEditComponent 
    },
    {
        path: 'customers/:id',
        component: CustomerDetailsComponent
    },
    {
        path: 'customers',
        component: CustomersListComponent
    },
    

];

export const CustomerRouting = RouterModule.forChild(routes);