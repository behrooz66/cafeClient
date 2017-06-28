import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../../report.service';
import { FlashMessageService } from '../../../shared/flash-message/flash-message.service';
import { Settings } from '../../../settings';
import { Chart } from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'report-order-daily-sum',
  templateUrl: './report-order-daily-sum.component.html',
  styleUrls: ['./report-order-daily-sum.component.css'],
  providers:[
      ReportService,
  ]
})
export class ReportOrderDailySumComponent implements OnInit {

  data = [];
  dateFrom: string;
  dateTo: string;
  typeId: number = 0;
  mode: string;

  //setting:
  maximumPeriodAllowed: number = 6; // in months...

  @ViewChild('chartRevenue') chartRevenue;
  @ViewChild('chartQuantity') chartQuantity;
  
  constructor(private _report: ReportService,
              private _flash: FlashMessageService) { }

  ngOnInit() {
      this.dateTo = moment().format("YYYY-MM-DD");
      this.dateFrom = moment(moment().subtract(2, "months")).format("YYYY-MM-DD");
  }

  refresh() {
      if (this.isWithinAllowedPeriodRange())
      {
          this.mode = "loading";
          this._report.getOrdersDailySum(this.dateFrom, this.dateTo, this.typeId)
            .subscribe(
                d => {
                    this.data = d;
                    this.addTotals();
                    this.normalizeData();
                    this.drawChartRevenue();
                    this.drawChartQuantity();
                    this.mode = "success";
                },
                d => {
                    this._flash.addMessage("Error", "Error in generating the report.", true, "danger", 2500, 2);
                    this.mode = "error";
                }
            );
      }
      else
      {
          this.mode = "exceed";
      }
      
      
  }

  drawChartRevenue(){
      let chart = new Chart(this.chartRevenue.nativeElement.getContext('2d'), {
          type: 'line',
          data: {
              labels: this.data.map(x => x.Date),
              datasets: [
                  {
                      label: 'Total',
                      data: this.data.map(x => x.TotalRevenue),
                      backgroundColor: 'rgba(255, 110, 0, 0.0)',
                      borderColor: 'rgba(255, 110, 0, 1.0)'
                  },
                  {
                      label: 'Take Out',
                      data: this.data.map(x => x.TakeOut_revenue),
                      backgroundColor: 'rgba(0, 255, 17, 0.2)',
                      borderColor: 'rgba(92, 194, 86, 1)'
                  },
                  {
                      label: 'Delivery',
                      data: this.data.map(x => x.Delivery_revenue),
                      backgroundColor: 'rgba(0, 123, 255, 0.2)',
                      borderColor: 'rgba(0, 123, 255, 1)'
                  },
                  {
                      label: 'Catering',
                      data: this.data.map(x => x.Catering_revenue),
                      backgroundColor: 'rgba(207, 202, 74, 0.2)',
                      borderColor: 'rgba(207, 202, 74, 1)'
                  }
              ]
          },
          options:{
              title: {
                  display: true,
                  text: 'Daily Sales Revenue',
                  fontSize: 16
              },
              scales:{
                  yAxes:[
                      { 
                          ticks: 
                          {
                              min: 0,
                              callback: 
                                (value, index, values) => '$'+value
                          }
                      }
                  ]
              }
          }
      });

      chart.render();
  }


  drawChartQuantity(){
      let chart = new Chart(this.chartQuantity.nativeElement.getContext('2d'), {
          type: 'line',
          data: {
              labels: this.data.map(x => x.Date),
              datasets: [
                  {
                      label: 'Total',
                      data: this.data.map(x => x.TotalNumber),
                      backgroundColor: 'rgba(255, 110, 0, 0.0)',
                      borderColor: 'rgba(255, 110, 0, 1.0)'
                  },
                  {
                      label: 'Take Out',
                      data: this.data.map(x => x.TakeOut_number),
                      backgroundColor: 'rgba(0, 255, 17, 0.2)',
                      borderColor: 'rgba(92, 194, 86, 1)'
                  },
                  {
                      label: 'Delivery',
                      data: this.data.map(x => x.Delivery_number),
                      backgroundColor: 'rgba(0, 123, 255, 0.2)',
                      borderColor: 'rgba(0, 123, 255, 1)'
                  },
                  {
                      label: 'Catering',
                      data: this.data.map(x => x.Catering_number),
                      backgroundColor: 'rgba(207, 202, 74, 0.2)',
                      borderColor: 'rgba(207, 202, 74, 1)'
                  }
              ]
          },
          options:{
              title: {
                  display: true,
                  text: 'Daily Sales Quantity',
                  fontSize: 16
              },
              scales:{
                  yAxes:[
                      { 
                          ticks: 
                          {
                              min: 0,
                              callback: 
                                (value, index, values) => Math.floor(value) === value? value : null
                          }
                      }
                  ]
              }
          }
      });

      chart.render();
  }

  private normalizeData() {
      let index = -1;
      while (index < this.data.length - 1) {
          index++;
          if (index + 1 >= this.data.length)
              break;
          let date = this.data[index].Date;
          let date2 = this.data[index + 1].Date;
          
          if (this.isDateGap(date, date2)) {
              this.fillTheGap(date, date2, index);
          }
      }
  }

// inserts an all-zero object everywhere there is gap between two actual days with non-zero values.
  private fillTheGap(date1: string, date2: string, startIndex: number){
      let d1 = moment(date1).format('YYYY-MM-DD');
      let d2 = moment(date2).format('YYYY-MM-DD');
      let d3 = moment(date1).add(1, 'days').format('YYYY-MM-DD');
      while (d3 !== d2) {
          this.data.splice(++startIndex, 0, {
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

  }

  private isDateGap(date1: string, date2: string) {
      let d1 = moment(date1);
      let d2 = moment(date2);
      return Math.abs(d1.diff(d2, 'days')) > 1 ? true : false
  }

// unifies the date format for all, and adds the total revenue and total number to each item.
  private addTotals(){
      this.data.forEach(e => {
          if (e.Date.length > 10) e.Date = e.Date.substr(0, 10);
          e.TotalRevenue = e.Delivery_revenue + e.TakeOut_revenue + e.Catering_revenue;
          e.TotalNumber = e.Delivery_number + e.TakeOut_number + e.Catering_number;
      });
  }

  private isWithinAllowedPeriodRange(){
      if (Math.abs(moment(this.dateFrom).diff(moment(this.dateTo), "months")) > this.maximumPeriodAllowed)
            return false;
      return true;
  }

}


