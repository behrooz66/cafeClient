import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  providers: [OrderService]
})
export class OrderDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
