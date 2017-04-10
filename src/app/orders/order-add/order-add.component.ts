import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../iorder';

@Component({
  selector: 'order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css'],
  providers: [OrderService]
})
export class OrderAddComponent implements OnInit, OnDestroy {

  private sub;
  order: Order = new Order();
  newOrderForm: FormGroup;

  constructor(fb: FormBuilder,
              private _orderService: OrderService,
              private _activatedRoute: ActivatedRoute) 
  {
      this.newOrderForm = fb.group({
          date: ['', Validators.required],
          orderTypeId: ['', Validators.required],
          price: ['', Validators.required],
          notes: ['']
      });
  }

  ngOnInit() {
      this.sub = this._activatedRoute.params.subscribe(params => {
          this.order.customerId = +params["id"]
      });
      this.order.price = 0;
      this.order.date = new Date().toString();
  }

  submit(){
      console.log(this.order);
  }

  typeChange($event){
      this.newOrderForm.controls["orderTypeId"].setValue(+$event);
      this.order.orderTypeId = +$event;
  }

  dateChange($event){
      console.log($event);
  }

  ngOnDestroy(){
      this.sub.unsubscribe();
  }

  cancel(){
      console.log(this.order);
  }

}
