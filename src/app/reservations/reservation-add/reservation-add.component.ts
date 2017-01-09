import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'reservation-add',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation-add.component.css'],
  providers: [ReservationService]
})
export class ReservationAddComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
