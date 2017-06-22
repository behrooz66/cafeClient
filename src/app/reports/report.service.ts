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
}
