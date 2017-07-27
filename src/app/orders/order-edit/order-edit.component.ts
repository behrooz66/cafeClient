import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ModalComponent } from '../../shared/modal/modal.component';
import { OrderService } from '../order.service';
import { Order } from '../iorder';
import { FlashMessageService } from '../../shared/flash-message/flash-message.service';
import { FlashMessage } from '../../shared/flash-message/flash-message';
import { EditOrderValidators } from './edit-order-validators';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css'],
  providers: [OrderService]
})
export class OrderEditComponent implements OnInit, OnDestroy {


  private sub;
  order: Order = new Order();
  editOrderForm: FormGroup;

  onSubmitErrors = [];
  @ViewChild('mOnSumbitValidation') mOnSubmitValidation;
  waiting: boolean = false;

  constructor(fb: FormBuilder,
              private _orderService: OrderService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _flashMessage: FlashMessageService) 
  {
      this.editOrderForm = fb.group({
          date: [this.order.date, Validators.compose([Validators.required, EditOrderValidators.dateInvalid])],
          orderTypeId: [this.order.orderTypeId],
          price: [this.order.price, Validators.compose([Validators.required, EditOrderValidators.priceInvalid])],
          notes: [this.order.notes]
      });
  }

  ngOnInit() {
      let id:number = 0;
      this.sub = this._activatedRoute.params.subscribe(params => {
          id = +params["id"];
          this.order.id = id;
      });
      this._orderService.getOrder(id).subscribe(
        d => {
            this.order.customerId = d.customerId;
            this.order.date = d.date.substr(0,10);
            this.order.notes = d.notes;
            this.order.orderTypeId = d.orderTypeId;
            this.order.price = d.price;
            this.order.updatedAt = d.updatedAt;
            this.order.updatedBy = d.updatedBy;
        },
        d => {
            this._flashMessage.addMessage("Error", "Error in retrieving order. Please refresh the page.", false, "danger", 2500, 2);
        }
      );

      
  }

  ngOnDestroy(){
      this.sub.unsubscribe();
  }

  typeChange($event){
      this.editOrderForm.controls["orderTypeId"].setValue(+$event);
      this.order.orderTypeId = +$event;
  }

  dateChange($event){
      this.order.date = $event;
      this.editOrderForm.controls["date"].setValue($event);
  }

  priceChange($event) {
      this.order.price = $event;
      this.editOrderForm.controls["price"].setValue($event);
  }

  cancel(){
      
  }

  submit(){
      if (this.onSubmitValidation()){
          this.mOnSubmitValidation.open();
      }
      else {
          this.waiting = true;
          this._orderService.put(this.order.id, this.order)
              .finally(() => {
                  this.waiting = false;
              })
              .subscribe(d => {
                  this._flashMessage.addMessage("", "Order successfully updated.", true, "success", 2500, 2);
                  this._router.navigate(["/orders/list/", this.order.customerId]);
              }, 
              e => {
                  this._flashMessage.addMessage(e.toString(), "Unable to add the order. Please contact support if this recurring.", false, "danger", 2500, 2);
              });
      }
  }

  private onSubmitValidation():boolean {
      this.onSubmitErrors = [];
      if (this.editOrderForm.controls["date"].invalid)
        this.onSubmitErrors.push("The date is not valid.");

      if (this.editOrderForm.controls["price"].invalid) 
        this.onSubmitErrors.push("The price is not valid.");
    
      if (!this.order.orderTypeId)
        this.onSubmitErrors.push("Order type is not selected.");
      
      if (this.onSubmitErrors.length > 0)
        return true;
      return false;
  }

}
