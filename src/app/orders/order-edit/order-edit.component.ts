import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css'],
  providers: [OrderService]
})
export class OrderEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
