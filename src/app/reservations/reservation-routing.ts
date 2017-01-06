import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReservationsListComponent } from './reservations-list/reservations-list.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { ReservationEditComponent } from './reservation-edit/reservation-edit.component';
import { ReservationAddComponent } from './reservation-add/reservation-add.component';

const routes:Routes = [
    {
        path: 'customers/:id/reservations',
        component: ReservationsListComponent
    },
    {
        path: 'reservations/:id',
        component: ReservationDetailsComponent
    },
    {
        path: 'customers/:id/reservation/add',
        component: ReservationAddComponent
    },
    {
        path: 'reservations/edit/:id',
        component: ReservationEditComponent
    },

];

export const ReservationRouting = RouterModule.forChild(routes);