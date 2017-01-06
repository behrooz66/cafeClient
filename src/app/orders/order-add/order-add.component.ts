import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css'],
  providers: [OrderService]
})
export class OrderAddComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
