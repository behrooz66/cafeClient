import { Injectable } from '@angular/core';
import { Settings } from '../../settings';
import * as moment from 'moment';

@Injectable()
export class ReportOrderHelperService {

    dailySum_chartData(data: any[], startDate, endDate): any[]
    {   
        data = this.dailySum_addTotals(data);
        data = this.dailySum_normalizeDate(data);
        data = this.dailySum_addHead(data, startDate);
        data = this.dailySum_addTail(data, endDate);
        return data;
    }

    private dailySum_normalizeDate(data: any[]): any[]
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
              Catering_number: 0,
              Catering_revenue: 0,
              Delivery_number: 0,
              Delivery_revenue: 0,
              TakeOut_number: 0,
              TakeOut_revenue: 0,
              TotalRevenue: 0,
              TotalNumber: 0
          });
          d3 = moment(d3).add(1, 'days').format('YYYY-MM-DD');
      }
      return data;
  }

  private isDateGap(date1: string, date2: string)
  {
      let d1 = moment(date1);
      let d2 = moment(date2);
      return Math.abs(d1.diff(d2, 'days')) > 1 ? true : false
  }

  private dailySum_addTotals(data: any[]): any[]
  {
      data.forEach(e => {
          if (e.Date.length > 10) e.Date = e.Date.substr(0, 10);
          e.TotalRevenue = e.Delivery_revenue + e.TakeOut_revenue + e.Catering_revenue;
          e.TotalNumber = e.Delivery_number + e.TakeOut_number + e.Catering_number;
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

  ////////////////////////////////////////////
  //*** Monthly Sum */
  public monthlySum_prepareDataForRevenueBarChart(data: any[])
  {
      let months: string[] = [];
      let types: string[] = [];
      let datasets: any[] = [];
      
      data.forEach(element => {
          months.push(element.Month);
      });

      data[0].Types.forEach(e => {
          types.push(e.Type);
      });
      
      let colorIndex = 0;
      types.forEach(type => {
          let ds = {
              label: type,
              data: [],
              backgroundColor: Settings.reports.chartColors[colorIndex++]
          };
          
          for (let i=0; i < data.length; i++){
              ds.data.push(this.monthlySum_getRevenueData(data, type, i));
          }
          datasets.push(ds);
      });

      types.push("Total");

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
      let types: string[] = [];
      let datasets: any[] = [];
      
      data.forEach(element => {
          months.push(element.Month);
      });

      data[0].Types.forEach(e => {
          types.push(e.Type);
      });
      
      let colorIndex = 0;
      types.forEach(type => {
          let ds = {
              label: type,
              data: [],
              backgroundColor: Settings.reports.chartColors[colorIndex++]
          };
          
          for (let i=0; i < data.length; i++){
              ds.data.push(this.monthlySum_getQuantityData(data, type, i));
          }
          datasets.push(ds);
      });

      types.push("Total");

      datasets.push({
          label: "Total",
          data: [],
          backgroundColor: Settings.reports.chartColors[5]
      });

      data.forEach(el => {
          datasets[datasets.length-1].data.push(el.TotalOrders);
      });

      return {
          labels: months,
          datasets: datasets
      }
  }

  public monthlySum_prepareDataForRevenuePieChart(data: any[])
  {
      let types: string[] = [];
      let datasets: any[] = [];
      let sums: number[] = [];

      data[0].Types.forEach(e => {
          types.push(e.Type);
      });

      for (let t=0; t<types.length; t++){
          sums[t] = 0;
          for (let i=0; i < data.length; i++){
              sums[t] += this.monthlySum_getRevenueData(data, types[t], i);
          }
          sums[t] = Math.round(sums[t] * 100) / 100;
      }

      let dss = [{
            data: sums,
            backgroundColor: [
                Settings.reports.chartColors[0],
                Settings.reports.chartColors[1],
                Settings.reports.chartColors[2],
            ]
      }];

      return {
          labels: types,
          datasets: dss
      }
  }

  public monthlySum_prepareDataForQuantityPieChart(data: any[])
  {
      let types: string[] = [];
      let datasets: any[] = [];
      let sums: number[] = [];

      data[0].Types.forEach(e => {
          types.push(e.Type);
      });

      for (let t=0; t<types.length; t++){
          sums[t] = 0;
          for (let i=0; i < data.length; i++){
              sums[t] += this.monthlySum_getQuantityData(data, types[t], i);
          }
      }
      
      let dss = [{
            data: sums,
            backgroundColor: [
                Settings.reports.chartColors[0],
                Settings.reports.chartColors[1],
                Settings.reports.chartColors[2],
            ]
      }];

      return {
          labels: types,
          datasets: dss
      }
  }

  private monthlySum_getRevenueData(data: any[], type: string, index: number): number 
  {
      return data[index].Types.filter(d => d.Type === type)[0].Revenue;
  }

  private monthlySum_getQuantityData(data: any[], type: string, index: number): number 
  {
      return data[index].Types.filter(d => d.Type === type)[0].Count;
  }
  
}