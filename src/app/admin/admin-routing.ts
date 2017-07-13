import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersListComponent } from './users-list/users-list.component';
import { UserAddComponent } from './user-add/user-add.component';

const routes: Routes = [
    {
        path: 'users',
        component: UsersListComponent
    },
    {
        path: 'users/add',
        component: UserAddComponent
    }
]

export const AdminRouting = RouterModule.forChild(routes);