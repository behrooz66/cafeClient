import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.css'],
  providers: [ReservationService]
})
export class ReservationEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
