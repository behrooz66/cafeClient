import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';
import { ICustomer } from '../icustomer';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
  providers: [CustomerService]
})
export class CustomerDetailsComponent implements OnInit {

  customer;
  id: number;
  private sub;
  mode:string = "";

  constructor(private _activatedRoute:ActivatedRoute,
              private _customerService:CustomerService) { }

  ngOnInit() {
    this.mode = "loading";
    this.sub = this._activatedRoute.params.subscribe(params => {
      this.id = +params["id"]
    });
    this._customerService.getCustomer(this.id)
          .subscribe(d => {
              this.customer = d;
              this.mode = "success";
          }, 
          d => {
              this.mode = "error";
          });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  

}
