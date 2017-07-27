import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReservationService } from './reservation.service';

import { ReservationsListComponent } from './reservations-list/reservations-list.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { ReservationAddComponent } from './reservation-add/reservation-add.component';
import { ReservationEditComponent } from './reservation-edit/reservation-edit.component';
import { ReservationByDateComponent } from './reservation-by-date/reservation-by-date.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
      ReservationsListComponent, 
      ReservationDetailsComponent, 
      ReservationAddComponent, 
      ReservationEditComponent, ReservationByDateComponent
  ],
  providers: [
      ReservationService
  ],
  exports: [
      ReservationsListComponent, 
      ReservationDetailsComponent, 
      ReservationAddComponent, 
      ReservationEditComponent
  ]
})
export class ReservationsModule { }
