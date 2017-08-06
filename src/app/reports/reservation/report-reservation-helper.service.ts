import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class ReportReservationHelperService {

  dailySum_normalizeData(data: any[]): any[] 
  {
      console.log(data);
      let index = -1;
      while (index < data.length - 1) 
      {
          index++;
          if (index + 1 >= data.length)
              break;
          let date = data[index].Date;
          let date2 = data[index + 1].Date;
          
          if (this.isDateGap(date, date2)) 
          {
              data = this.fillTheGap(data, date, date2, index);
          }
      }
      return data;
  }

  private fillTheGap(data: any[], date1: string, date2: string, startIndex: number): any[]
  {
      let d1 = moment(date1).format('YYYY-MM-DD');
      let d2 = moment(date2).format('YYYY-MM-DD');
      let d3 = moment(date1).add(1, 'days').format('YYYY-MM-DD');
      while (d3 !== d2) {
          data.splice(++startIndex, 0, {
              Date: d3,
              ShownUp_revenue: 0,
              ShownUp_number: 0,
              NotShown_revenue: 0,
              NotShown_number: 0,
              Cancelled_revenue: 0,
              Cancelled_number: 0,
              Unspecified_revenue: 0,
              Unspecified_number: 0,
              TotalRevenue: 0,
              TotalNumber: 0
          });
          d3 = moment(d3).add(1, 'days').format('YYYY-MM-DD');
      }
      return data;

  }

  private isDateGap(date1: string, date2: string) {
      let d1 = moment(date1);
      let d2 = moment(date2);
      return Math.abs(d1.diff(d2, 'days')) > 1 ? true : false
  }

  // unifies the date format for all, and adds the total revenue and total number to each item.
  dailySum_addTotals(data: any[]){
      data.forEach(e => {
          if (e.Date.length > 10) e.Date = e.Date.substr(0, 10);
          e.TotalRevenue = e.ShownUp_revenue + e.Unspecified_revenue;
          e.TotalNumber = e.ShownUp_number + e.NotShown_number + e.Cancelled_number + e.Unspecified_number;
      });
      return data;
  }

  dailySum_addHead(data: any[], startDate): any[] 
  {
      startDate = moment(startDate).add(-1, 'days').format('YYYY-MM-DD');
      data = this.fillTheGap(data, startDate, data[0].Date, -1);
      return data;
  }

  dailySum_addTail(data: any[], endDate): any[] 
  {
      endDate = moment(endDate).add(1, 'days').format('YYYY-MM-DD');
      data = this.fillTheGap(data, data[data.length-1].Date, endDate, data.length);
      return data;
  }

}