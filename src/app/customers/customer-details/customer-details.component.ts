import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { ICustomer, Customer } from '../icustomer';
import { FlashMessageService } from '../../shared/flash-message/flash-message.service';
import { FlashMessage } from '../../shared/flash-message/flash-message';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
  providers: [CustomerService]
})
export class CustomerDetailsComponent implements OnInit {

  customer = new Customer();
  kir;
  orderSum = {};
  reservationSum = {};
  giftCardSum = {};
  id: number;
  private sub;

  @ViewChild('mConfirmDelete') mConfirmDelete;
  @ViewChild('mWait') mWait;

  constructor(private _activatedRoute:ActivatedRoute,
              private _router: Router,
              private _customerService:CustomerService,
              private _flash: FlashMessageService) { }

  ngOnInit() {
    this.mWait.open();
    this.sub = this._activatedRoute.params.subscribe(params => {
        this.id = +params["id"]
    });
    this.customerSummary();
    this.orderSummary();
    this.giftCardSummary();
    this.reservationSummary();
    this.mWait.close();
  }


  delete(id) {
      this.mConfirmDelete.open();
  }

  private mConfirmDeleteClose($event){
      if ($event.result) {
          this.mWait.open();
          this._customerService.archiveCustomer(this.id)
              .subscribe( 
                  d => {
                      this.mWait.close();
                      this._flash.addMessage("Success", "The customer was deleted.", true, "success", 2500, 2);
                      this._router.navigate(["customers"]);
                  },
                  d => {
                      this._flash.addMessage("Error", "The customer could not be deleted.", true, "danger", 2500, 2);
                  }
              );
      }
  }

  private customerSummary() {
      this.mWait.open();
      this._customerService.getCustomer(this.id)
        .subscribe(d => {
            this.customer = d;
            this.mWait.close();
        }, 
        d => {
            this._flash.addMessage("Error", "Error in retrieving data.", true, "danger", 2500, 2);
            this.mWait.close();
        });
  }

  private orderSummary() {
      this._customerService.orderSummary(this.id)
          .subscribe(
              d => {
                  this.orderSum = d;
              },
              d => {
                  // todo
              }
          );
  }

  private giftCardSummary() {
      this._customerService.giftCardSummary(this.id)
          .subscribe(
              d => {
                  this.giftCardSum = d;
              },
              d => {
                  // todo
              }
          );
  }

  private reservationSummary() {
      this._customerService.reservationSummary(this.id)
          .subscribe(
              d => {
                  this.reservationSum = d;
              },
              d => {
                  // todo
              }
          );
  }


  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  

}
