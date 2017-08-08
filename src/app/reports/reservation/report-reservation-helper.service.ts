import { Injectable } from '@angular/core';
import { Settings } from '../../settings';
import * as moment from 'moment';

@Injectable()
export class ReportReservationHelperService {

  dailySum_chartData(data: any[], startDate, endDate)
  {
        data = this.dailySum_addTotals(data);
        data = this.dailySum_normalizeData(data);
        data = this.dailySum_addHead(data, startDate);
        data = this.dailySum_addTail(data, endDate);
        return data;
  }

  private dailySum_normalizeData(data: any[]): any[] 
  {
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

  private dailySum_addTotals(data: any[]){
      data.forEach(e => {
          if (e.Date.length > 10) e.Date = e.Date.substr(0, 10);
          e.TotalRevenue = e.ShownUp_revenue + e.Unspecified_revenue;
          e.TotalNumber = e.ShownUp_number + e.NotShown_number + e.Cancelled_number + e.Unspecified_number;
      });
      return data;
  }

  private dailySum_addHead(data: any[], startDate): any[] 
  {
      startDate = moment(startDate).add(-1, 'days').format('YYYY-MM-DD');
      data = this.fillTheGap(data, startDate, data[0].Date, -1);
      return data;
  }

  private dailySum_addTail(data: any[], endDate): any[] 
  {
      endDate = moment(endDate).add(1, 'days').format('YYYY-MM-DD');
      data = this.fillTheGap(data, data[data.length-1].Date, endDate, data.length);
      return data;
  }

  //*** Monthly Sum */
  public monthlySum_prepareDataForRevenueBarChart(data: any[])
  {
      let months: string[] = [];
      let statuses: string[] = [];
      let datasets: any[] = [];
      
      data.forEach(element => {
          months.push(element.Month);
      });

      data[0].Statuses.forEach(e => {
          statuses.push(e.Status);
      });
      
      let colorIndex = 0;
      statuses.forEach(status => {
          let ds = {
              label: status,
              data: [],
              backgroundColor: Settings.reports.chartColors[colorIndex++]
          };
          
          for (let i=0; i < data.length; i++){
              ds.data.push(this.monthlySum_getRevenueData(data, status, i));
          }
          datasets.push(ds);
      });

      statuses.push("Total");

      datasets.push({
          label: "Total",
          data: [],
          backgroundColor: Settings.reports.chartColors[5]
      });

      data.forEach(el => {
          datasets[datasets.length-1].data.push(el.TotalRevenue);
      });

      return {
          labels: months,
          datasets: datasets
      }
  }

  public monthlySum_prepareDataForQuantityBarChart(data: any[])
  {
      let months: string[] = [];
      let statuses: string[] = [];
      let datasets: any[] = [];
      
      data.forEach(element => {
          months.push(element.Month);
      });

      data[0].Statuses.forEach(e => {
          statuses.push(e.Status);
      });
      
      let colorIndex = 0;
      statuses.forEach(status => {
          let ds = {
              label: status,
              data: [],
              backgroundColor: Settings.reports.chartColors[colorIndex++]
          };
          
          for (let i=0; i < data.length; i++){
              ds.data.push(this.monthlySum_getQuantityData(data, status, i));
          }
          datasets.push(ds);
      });

      statuses.push("Total");

      datasets.push({
          label: "Total",
          data: [],
          backgroundColor: Settings.reports.chartColors[5]
      });

      data.forEach(el => {
          console.log(el);
          datasets[datasets.length-1].data.push(el.TotalReservations);
      });
      
      return {
          labels: months,
          datasets: datasets
      }
  }

  public monthlySum_prepareDataForQuantityPieChart(data: any[])
  {
      let statuses: string[] = [];
      let datasets: any[] = [];
      let sums: number[] = [];

      data[0].Statuses.forEach(e => {
          statuses.push(e.Status);
      });

      for (let t=0; t<statuses.length; t++){
          sums[t] = 0;
          for (let i=0; i < data.length; i++){
              sums[t] += this.monthlySum_getQuantityData(data, statuses[t], i);
          }
      }

      let dss = [
          {
              data: sums,
              backgroundColor: [
                  Settings.reports.chartColors[0],
                  Settings.reports.chartColors[1],
                  Settings.reports.chartColors[2],
              ]
          }
      ]

      return  {
          labels: statuses,
          datasets: dss
      }
  }

  private monthlySum_getRevenueData(data: any[], status: string, index: number): number 
  {
      return data[index].Statuses.filter(d => d.Status === status)[0].Revenue;
  }

  private monthlySum_getQuantityData(data: any[], status: string, index: number): number 
  {
      return data[index].Statuses.filter(d => d.Status === status)[0].Count;
  }

}