import { Injectable, Injector } from '@angular/core';
import { ICustomer, Customer } from './icustomer';
import { Settings } from '../settings';
import { HttpAuthService } from '../shared/http-auth.service'; 


@Injectable()
export class CustomerService {

  apiBase: string;
  _customer: any[];

  constructor(private _http:HttpAuthService) {
      this.apiBase = Settings.apiBase + "customer/";
  }

  addCustomer(customer: Customer) {
       return this._http.post(this.apiBase+"post", customer)
             .map(r => r.json());
  }

  getCustomers(){
    return [];
  }

  getCustomer(){
    return {};
  }


}
