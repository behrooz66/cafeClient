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

  waiting = {
      customerSummary: false,
      orderSummary: false,
      giftCardSummary: false,
      reservationSummary: false
  };

  constructor(private _activatedRoute:ActivatedRoute,
              private _router: Router,
              private _customerService:CustomerService,
              private _flash: FlashMessageService) { }

  ngOnInit() {
    this.sub = this._activatedRoute.params.subscribe(params => {
        this.id = +params["id"]
    });
    this.customerSummary();
    this.orderSummary();
    this.giftCardSummary();
    this.reservationSummary();
  }


  delete(id) {
      this.mConfirmDelete.open();
  }

  private mConfirmDeleteClose($event){
      if ($event.result) {
          this._customerService.archiveCustomer(this.id)
              .subscribe( 
                  d => {
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
      this.waiting.customerSummary = true;
      this._customerService.getCustomer(this.id)
        .subscribe(d => {
            this.customer = d;
            this.waiting.customerSummary = false;
        }, 
        d => {
            this._flash.addMessage("Error", "Error in retrieving data.", true, "danger", 2500, 2);
             this.waiting.customerSummary = false;
        });
  }

  private orderSummary() {
      this.waiting.orderSummary = true;
      this._customerService.orderSummary(this.id)
          .finally(() => {
              this.waiting.orderSummary = false;
          })
          .subscribe(
              d => {
                  this.orderSum = d;
              },
              d => {
                  this._flash.addMessage("Error", "Order summary could not be fetched.", true, "danger", 2500, 2);
              }
          )
  }

  private giftCardSummary() {
      this.waiting.giftCardSummary = true;
      this._customerService.giftCardSummary(this.id)
          .subscribe(
              d => {
                  this.giftCardSum = d;
                  this.waiting.giftCardSummary = false;
              },
              d => {
                  this.waiting.giftCardSummary = false;
                  this._flash.addMessage("Error", "Gift Cards summary could not be fetched.", true, "danger", 2500, 2);
              }
          );
  }

  private reservationSummary() {
      this.waiting.reservationSummary = true;
      this._customerService.reservationSummary(this.id)
          .subscribe(
              d => {
                  this.reservationSum = d;
                  this.waiting.reservationSummary = false;
              },
              d => {
                  this.waiting.reservationSummary = false;
                  this._flash.addMessage("Error", "Reservation summary could not be fetched.", true, "danger", 2500, 2);
              }
          );
  }


  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  

}
