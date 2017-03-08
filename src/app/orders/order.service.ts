import { Injectable } from '@angular/core';
import { Settings } from '../settings';
import { HttpAuthService } from '../shared/http-auth.service';
import { Order } from './iorder';

@Injectable()
export class OrderService {

  apiBase: string;
  

  constructor(private _http:HttpAuthService) {
      this.apiBase = Settings.apiBase + "order/";
  }

  // getTypes() {
  //     return this._http.get()
  // }

  getOrdersByCustomer(customerId: number) {
      return this._http.get(this.apiBase + "getByCustomer?customerId=" + customerId)
          .map(r => r.json());
  }

  getOrder(id: number) {
      return this._http.get(this.apiBase + "get/" + id)
          .map(r => r.json());
  }

  getOrdersByRestaurant(restaurantId: number) {
      return this._http.get(this.apiBase + "getByRestaurant")
          .map(r => r.json());
  }

  post(order:Order) {
      return this._http.post(this.apiBase + "post", order)
          .map(r => r.json());
  }

  put(id: number, order:Order) {
      return this._http.put(this.apiBase + "put/" + id, order)
          .map(r => r.json());
  }

  archive(id: number) {
      return this._http.put(this.apiBase + "archive/" + id, null)
          .map(r => r.json());
  }

}
