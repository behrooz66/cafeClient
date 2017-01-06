import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { OrderAddComponent } from './order-add/order-add.component';

const routes:Routes = [
    {
        path: 'customers/:id/orders',
        component: OrdersListComponent
    },
    {
        path: 'orders/:id',
        component: OrderDetailsComponent
    },
    {
        path: 'customers/:id/order/add',
        component: OrderAddComponent
    },
    {
        path: 'orders/edit/:id',
        component: OrderEditComponent
    },

];

export const OrderRouting = RouterModule.forChild(routes);