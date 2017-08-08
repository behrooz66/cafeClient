import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../../report.service';
import { ReportOrderHelperService } from '../report-order-helper.service';
import { FlashMessageService } from '../../../shared/flash-message/flash-message.service';
import { Settings } from '../../../settings';
import { Chart } from 'chart.js';
import { ChartService, LineChartDataset } from '../../../shared/chart.service';
import * as moment from 'moment';

@Component({
  selector: 'report-order-daily-sum',
  templateUrl: './report-order-daily-sum.component.html',
  styleUrls: ['./report-order-daily-sum.component.css'],
  providers:[
      ReportService,
      ReportOrderHelperService,
      ChartService
  ]
})
export class ReportOrderDailySumComponent implements OnInit {

  data = [];
  dateFrom: string;
  dateTo: string;
  typeId: number = 0;
  mode: string;

  //setting:
  maxAllowedPeriod: number; // in months...

  @ViewChild('chartRevenue') chartRevenue;
  @ViewChild('chartQuantity') chartQuantity;
  
  constructor(private _report: ReportService,
              private _flash: FlashMessageService,
              private _helper: ReportOrderHelperService,
              private _chart: ChartService) { }

  ngOnInit() 
  {
      this.maxAllowedPeriod = Settings.reports.orders.dailySum.maximumPeriodAllowed;
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
                    if (d.length > 0)
                    {
                        this.data = this._helper.dailySum_chartData(d, this.dateFrom, this.dateTo);
                        this.drawChartRevenue();
                        this.drawChartQuantity();
                    }
                    else 
                    {
                        //todo: do something...
                    }
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

  drawChartRevenue()
  {
      let datasets: LineChartDataset[] = [
             {
                      label: 'Total',
                      data: this.data.map(x => x.TotalRevenue),
                      backgroundColor: 'rgba(255, 110, 0, 0.0)',
                      borderColor: 'rgba(255, 110, 0, 1.0)',
                      borderDash: [1, 0]
                  },
                  {
                      label: 'Take Out',
                      data: this.data.map(x => x.TakeOut_revenue),
                      backgroundColor: 'rgba(0, 255, 17, 0.2)',
                      borderColor: 'rgba(92, 194, 86, 1)',
                      borderDash: [1, 0]
                  },
                  {
                      label: 'Delivery',
                      data: this.data.map(x => x.Delivery_revenue),
                      backgroundColor: 'rgba(0, 123, 255, 0.2)',
                      borderColor: 'rgba(0, 123, 255, 1)',
                      borderDash: [1, 0]
                  },
                  {
                      label: 'Catering',
                      data: this.data.map(x => x.Catering_revenue),
                      backgroundColor: 'rgba(207, 202, 74, 0.2)',
                      borderColor: 'rgba(207, 202, 74, 1)',
                      borderDash: [1, 0]
                  }
      ];

      let options = {
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
          };
      
      let chart = this._chart.lineChart(this.chartRevenue, this.data.map(x => x.Date), datasets, options);
      chart.render();
  }


  drawChartQuantity()
  {
      let datasets: LineChartDataset[] = [
            {
                label: 'Total',
                data: this.data.map(x => x.TotalNumber),
                backgroundColor: 'rgba(255, 110, 0, 0.0)',
                borderColor: 'rgba(255, 110, 0, 1.0)',
                borderDash: [1, 0]
            },
            {
                label: 'Take Out',
                data: this.data.map(x => x.TakeOut_number),
                backgroundColor: 'rgba(0, 255, 17, 0.2)',
                borderColor: 'rgba(92, 194, 86, 1)',
                borderDash: [1, 0]
            },
            {
                label: 'Delivery',
                data: this.data.map(x => x.Delivery_number),
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderDash: [1, 0]
            },
            {
                label: 'Catering',
                data: this.data.map(x => x.Catering_number),
                backgroundColor: 'rgba(207, 202, 74, 0.2)',
                borderColor: 'rgba(207, 202, 74, 1)',
                borderDash: [1, 0]
            }
      ];

      let options = {
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
          };

      let chart = this._chart.lineChart(this.chartQuantity, this.data.map(x => x.Date), datasets, options);
      chart.render();
  }

  private isWithinAllowedPeriodRange(){
      if (Math.abs(moment(this.dateFrom).diff(moment(this.dateTo), "months")) > this.maxAllowedPeriod)
            return false;
      return true;
  }

}


