import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
  providers: [OrderService]
})
export class OrdersListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
