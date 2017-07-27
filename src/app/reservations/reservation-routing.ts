import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReservationsListComponent } from './reservations-list/reservations-list.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { ReservationEditComponent } from './reservation-edit/reservation-edit.component';
import { ReservationAddComponent } from './reservation-add/reservation-add.component';
import { ReservationByDateComponent } from './reservation-by-date/reservation-by-date.component';

const routes:Routes = [
    {
        path: 'reservations/list/:customerId',
        component: ReservationsListComponent
    },
    {
        path: 'reservations/:id',
        component: ReservationDetailsComponent
    },
    {
        path: 'reservations/add/:customerId',
        component: ReservationAddComponent
    },
    {
        path: 'reservations/edit/:id',
        component: ReservationEditComponent
    },
    {
        path: 'reservations/by/date',
        component: ReservationByDateComponent
    }

];

export const ReservationRouting = RouterModule.forChild(routes);