import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css'],
  providers: [ReservationService]
})
export class ReservationDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
