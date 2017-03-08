import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../iorder';

@Component({
  selector: 'order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css'],
  providers: [OrderService]
})
export class OrderAddComponent implements OnInit {

  order: Order = new Order();
  newOrderForm: FormGroup;

  constructor(fb: FormBuilder,
              private _orderService: OrderService,) 
  {
      this.newOrderForm = fb.group({
          date: ['', Validators.required],
          orderTypeId: ['', Validators.required],
          price: ['', Validators.required],
          notes: ['']
      });
  }

  ngOnInit() {
      
  }

}
