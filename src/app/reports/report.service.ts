import { Injectable } from '@angular/core';
import { Settings } from '../settings';
import { HttpAuthService } from '../shared/http-auth.service';
import { URLSearchParams, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class ReportService {

  private apiBase: string;

  constructor(private _http: HttpAuthService) 
  {
      this.apiBase = Settings.apiBase + "report/";
  }


  // ORDERS RELATED
  getOrdersMonthlySum(dateFrom: string, dateTo: string, typeId: number){
      let params: string = '?dateFrom=' + dateFrom + '&dateTo=' + dateTo;
      if (typeId !== null) {
          params += '&typeId=' + typeId.toString();
      }
      console.log(params);
      return this._http.get(this.apiBase+"ordersMonthlySum" + params)
          .map(r => r.json());
  }

  getOrderRecords(dateFrom: string, dateTo: string, typeId: number, priceFrom: number, priceTo: number, deleted: boolean){
      let params: string = '?dateFrom=' + dateFrom + '&dateTo=' + dateTo + '&typeId=' + typeId.toString()
                           + '&priceFrom=' + priceFrom + '&priceTo=' + priceTo + '&deleted=' + deleted;
      return this._http.get(this.apiBase + "orderRecords" + params)
          .map(r => r.json());
  }

  getOrdersTopCustomers(dateFrom: string, dateTo: string, minRevenue: number, minOrder: number) {
      let params: string = '?dateFrom=' + dateFrom + '&dateTo=' + dateTo + '&minRevenue=' + minRevenue.toString() + '&minOrder=' + minOrder.toString();
      return this._http.get(this.apiBase + "ordersTopCustomers" + params)
          .map(r => r.json());
  }

  getOrdersDailySum(dateFrom: string, dateTo: string, typeId: number){
      let params: string = '?dateFrom=' + dateFrom + '&dateTo=' + dateTo + '&typeId=' + typeId.toString();
      return this._http.get(this.apiBase + "ordersDailySum" + params)
          .map(r => r.json());
  }
  // orders end





  // RESERVATIONS RELATED
  getReservationsMonthlySum(dateFrom: string, dateTo: string, statusId: number){
      let params: string = '?dateFrom=' + dateFrom + '&dateTo=' + dateTo;
      if (statusId !== null) {
          params += '&statusId=' + statusId.toString();
      }
      return this._http.get(this.apiBase+"reservationsMonthlySum" + params)
          .map(r => r.json());
  }

  getReservationsRecords(dateFrom: string, dateTo: string, statusId: number, deleted: boolean){
      let params: string = '?dateFrom=' + dateFrom + '&dateTo=' + dateTo + '&statusId=' + statusId.toString()
                           + '&deleted=' + deleted;
      return this._http.get(this.apiBase + "reservationRecords" + params)
          .map(r => r.json());
  }

  getReservationsTopCustomers(dateFrom: string, dateTo: string, minRevenue: number, minReservation: number, includeUnspecified: boolean) {
      let params: string = '?dateFrom=' + dateFrom + '&dateTo=' + dateTo + '&minRevenue=' 
                            + minRevenue.toString() + '&minReservation=' + minReservation.toString()
                            + '&includeUnspecified=' + includeUnspecified;
      return this._http.get(this.apiBase + "reservationsTopCustomers" + params)
          .map(r => r.json());
  }

  getReservationsDailySum(dateFrom: string, dateTo: string, statusId: number){
      let params: string = '?dateFrom=' + dateFrom + '&dateTo=' + dateTo + '&statusId=' + statusId.toString();
      return this._http.get(this.apiBase + "reservationsDailySum" + params)
          .map(r => r.json());
  }
  // reservations end



  // GIFTCARDS RELATED
  getGiftCardssMonthlySum(dateFrom: string, dateTo: string){
      let params: string = '?dateFrom=' + dateFrom + '&dateTo=' + dateTo;
    //   if (statusId !== null) {
    //       params += '&statusId=' + statusId.toString();
    //   }
      return this._http.get(this.apiBase+"giftCardsMonthlySum" + params)
          .map(r => r.json());
  }

  getGiftCardsRecords(issueDateFrom: string, issueDateTo: string, expiryDateFrom: string, expiryDateTo: string,
                      amountFrom: number, amountTo:number, typeId: number, deleted: boolean)
  {
      let params: string = '?issueDateFrom=' + issueDateFrom + '&issueDateTo=' + issueDateTo + '&typeId=' + typeId.toString()
                           + 'expiryDateFrom=' + expiryDateFrom + '&expiryDateTo=' + expiryDateTo
                           + 'amountFrom=' + amountFrom + '&amountTo=' + amountTo
                           + '&deleted=' + deleted;
      return this._http.get(this.apiBase + "giftCardRecords" + params)
          .map(r => r.json());
  }

  getGiftCardsTopCustomers(dateFrom: string, dateTo: string, minRevenue: number, minCards: number, typeId = null) 
  {
      let params: string = '?dateFrom=' + dateFrom + '&dateTo=' + dateTo + '&minRevenue=' + minRevenue.toString() + '&minCards=' + minCards.toString();
      if (typeId !== null) {
          params += '&typeId=' + typeId;
      }
      console.log(params);
      return this._http.get(this.apiBase + "giftCardsTopCustomers" + params)
          .map(r => r.json());
  }

  getGiftCardsDailySum(dateFrom: string, dateTo: string, typeId: number){
      let params: string = '?dateFrom=' + dateFrom + '&dateTo=' + dateTo + '&typeId=' + typeId.toString();
      return this._http.get(this.apiBase + "giftCardsDailySum" + params)
          .map(r => r.json());
  }
  // giftcards end
}
