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

  updateCustomer(id:number, customer:Customer){
      return this._http.put(this.apiBase+"put/" + id, customer)
            .map(r => r.json());
  }

  getCustomers(){
      return this._http.get(this.apiBase+"get")
            .map(r => r.json());
  }

  getCustomer(id){
      return this._http.get(this.apiBase+"get/"+id)
          .map(r => r.json());
  }

  deleteCustomer(id) {
      return this._http.delete(this.apiBase + "delete/" + id)
          .map(r => r.json());
  }

  archiveCustomer(id: number) {
      return this._http.put(this.apiBase + "archive/" + id, null)
            .map(r => r.json());
  }

  getHistory(id: number) {
      return this._http.get(this.apiBase + "history/" + id)
            .map(r => r.json());
  }

  orderSummary(id: number) {
      return this._http.get(this.apiBase + "orderSummary/" + id)
            .map(r => r.json());
  }

  giftCardSummary(id: number) {
      return this._http.get(this.apiBase + "giftCardSummary/" + id)
            .map(r => r.json());
  }

  reservationSummary(id: number) {
      return this._http.get(this.apiBase + "reservationSummary/" + id)
            .map(r => r.json());
  }


}
