import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NewOrderValidators } from './new-order-validators';
import { Router } from '@angular/router';
import { ModalComponent } from '../../shared/modal/modal.component';
import { OrderService } from '../order.service';
import { Order } from '../iorder';
import { FlashMessageService } from '../../shared/flash-message/flash-message.service';
import { FlashMessage } from '../../shared/flash-message/flash-message';
import * as moment from 'moment';

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

  onSubmitErrors = [];
  @ViewChild('mOnSumbitValidation') mOnSubmitValidation;
  @ViewChild('mWait') mWait;

  constructor(fb: FormBuilder,
              private _orderService: OrderService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _flashMessage: FlashMessageService) 
  {
      this.newOrderForm = fb.group({
          date: ['', Validators.compose([Validators.required, NewOrderValidators.dateInvalid])],
          orderTypeId: ['', Validators.required],
          price: ['', Validators.compose([Validators.required, NewOrderValidators.priceInvalid])],
          notes: ['']
      });
  }

  ngOnInit() {
      this.sub = this._activatedRoute.params.subscribe(params => {
          this.order.customerId = +params["customerId"]
      });
      this.order.price = 0;
      this.order.date = moment().format("YYYY-MM-DD").toString();
  }

  typeChange($event){
      this.newOrderForm.controls["orderTypeId"].setValue(+$event);
      this.order.orderTypeId = +$event;
  }

  dateChange($event){
      this.order.date = $event;
      this.newOrderForm.controls["date"].setValue($event);
  }

  ngOnDestroy(){
      this.sub.unsubscribe();
  }

  cancel(){
      this.mWait.open();
      this._flashMessage.addMessage("Error", "Unable to update the customer. Please contact support if this recurring.", false, "danger", 2500, 2);
  }

  submit(){
      if (this.onSubmitValidation()){
          this.mOnSubmitValidation.open();
      }
      else {
          this.mWait.open();
          this._orderService.post(this.order)
              .subscribe(d => {
                  this._flashMessage.addMessage("", "Order successfully added.", true, "success", 2500, 2);
                  this._router.navigate(["/orders/list/", this.order.customerId]);
              }, 
              d => {
                  this._flashMessage.addMessage("Error", "Unable to add the order. Please contact support if this recurring.", false, "danger", 2500, 2);
                  this.mWait.close();
              },
              () => {
                  this.mWait.close();
              });
      }
  }

  private onSubmitValidation():boolean {
      this.onSubmitErrors = [];
      if (this.newOrderForm.controls["date"].invalid)
        this.onSubmitErrors.push("The date is not valid.");

      if (this.newOrderForm.controls["price"].invalid) 
        this.onSubmitErrors.push("The price is not valid.");
    
      if (!this.order.orderTypeId)
        this.onSubmitErrors.push("Order type is not selected.");
      
      if (this.onSubmitErrors.length > 0)
        return true;
      return false;
  }

}
