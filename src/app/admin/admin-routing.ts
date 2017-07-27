import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersListComponent } from './users-list/users-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { TicketAddComponent } from './ticket-add/ticket-add.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';

const routes: Routes = [
    {
        path: 'users',
        component: UsersListComponent
    },
    {
        path: 'users/add',
        component: UserAddComponent
    },
    {
        path: 'support/tickets/add',
        component: TicketAddComponent
    },
    {
        path: 'support/tickets/list',
        component: TicketListComponent
    },
    {
        path: 'support/tickets/details/:id',
        component: TicketDetailsComponent
    }
]

export const AdminRouting = RouterModule.forChild(routes);