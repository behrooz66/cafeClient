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

  customer:ICustomer;
  id: number;
  private sub;

  constructor(private _activatedRoute:ActivatedRoute,
              private _customerService:CustomerService) { }

  ngOnInit() {
    // this.sub = this._activatedRoute.params.subscribe(params => {
    //   this.id = +params["id"]
    // });
    // this.customer = this._customerService.getCustomer(this.id);
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  

}
