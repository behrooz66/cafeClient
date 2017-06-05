import { Injectable } from '@angular/core';
import { Settings } from '../settings';
import { HttpAuthService } from '../shared/http-auth.service';
import { Reservation } from './ireservation';

@Injectable()
export class ReservationService {

   apiBase: string;
  

  constructor(private _http:HttpAuthService) {
      this.apiBase = Settings.apiBase + "reservation/";
  }

  getReservationsByCustomer(customerId: number) {
      return this._http.get(this.apiBase + "getByCustomer?customerId=" + customerId)
          .map(r => r.json());
  }

  getReservation(id: number) {
      return this._http.get(this.apiBase + "get/" + id)
          .map(r => r.json());
  }

  getReservationsByRestaurant(restaurantId: number) {
      return this._http.get(this.apiBase + "getByRestaurant")
          .map(r => r.json());
  }

  post(reservation: Reservation) {
      return this._http.post(this.apiBase + "post", reservation)
          .map(r => r.json());
  }

  put(id: number, reservation: Reservation) {
      return this._http.put(this.apiBase + "put/" + id, reservation)
          .map(r => r.json());
  }

  archive(id: number) {
      return this._http.put(this.apiBase + "archive/" + id, null)
          .map(r => r.json());
  }

  unarchive(id: number) {
      return this._http.put(this.apiBase + "unarchive/" + id, null)
          .map(r => r.json());
  }

  delete(id: number) {
      return this._http.delete(this.apiBase + "delete/" + id)
            .map(r => r.json());
  }

}
