import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.css'],
  providers: [ReservationService]
})
export class ReservationsListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
