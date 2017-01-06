import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationService } from './reservation.service';

import { ReservationsListComponent } from './reservations-list/reservations-list.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { ReservationAddComponent } from './reservation-add/reservation-add.component';
import { ReservationEditComponent } from './reservation-edit/reservation-edit.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
      ReservationsListComponent, 
      ReservationDetailsComponent, 
      ReservationAddComponent, 
      ReservationEditComponent
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
