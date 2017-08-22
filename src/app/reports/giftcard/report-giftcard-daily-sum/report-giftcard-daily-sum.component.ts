import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../../report.service';
import { ReportGiftCardHelperService } from '../report-giftcard-helper.service';
import { FlashMessageService } from '../../../shared/flash-message/flash-message.service';
import { Settings } from '../../../settings';
import { Chart } from 'chart.js';
import { ChartService, LineChartDataset } from '../../../shared/chart.service';
import * as moment from 'moment';

@Component({
  selector: 'report-giftcard-daily-sum',
  templateUrl: './report-giftcard-daily-sum.component.html',
  styleUrls: ['./report-giftcard-daily-sum.component.css'],
  providers:[
      ReportService,
      ReportGiftCardHelperService,
      ChartService
  ]
})
export class ReportGiftcardDailySumComponent implements OnInit {

  data = [];
  dateFrom: string;
  dateTo: string;
  typeId: number = 0;
  mode: string;
  empty: boolean = false;

  //setting:
  maxAllowedPeriod: number; // in months...

  @ViewChild('chartRevenue') chartRevenue;
  @ViewChild('chartQuantity') chartQuantity;

  // chart objects
  chartRevenueLine: Chart;
  chartQuantityLine: Chart;

  constructor(private _report: ReportService,
              private _flash: FlashMessageService,
              private _helper: ReportGiftCardHelperService,
              private _chart: ChartService) { }

  ngOnInit() 
  {
      this.maxAllowedPeriod = Settings.reports.giftCards.dailySum.maximumPeriodAllowed;
      this.dateTo = moment().format("YYYY-MM-DD");
      this.dateFrom = moment(moment().subtract(2, "months")).format("YYYY-MM-DD");
  }

  refresh() 
  {
      if (this.isWithinAllowedPeriodRange())
      {
          this.mode = "loading";
          this.empty = false;
          this._report.getGiftCardsDailySum(this.dateFrom, this.dateTo, this.typeId)
            .subscribe(
                d => {
                    if (d.length !== 0) 
                    {
                        this.data = this._helper.dailySum_chartData(d, this.dateFrom, this.dateTo);
                        this.drawChartRevenue();
                        this.drawChartQuantity();
                    }
                    else {
                        //this._flash.addMessage("Info", "No data found for the selected period.", false, "warning", 2500, 2);
                        this.empty = true;
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
      let datasets: LineChartDataset[] =
      [
            {
                label: 'Total',
                data: this.data.map(x => x.TotalRevenue),
                backgroundColor: 'rgba(255, 110, 0, 0.0)',
                borderColor: 'rgba(255, 110, 0, 1.0)',
                borderDash: [1, 0]
            },
            {
                label: 'Purchase',
                data: this.data.map(x => x.Purchase_revenue),
                backgroundColor: 'rgba(0, 255, 17, 0.2)',
                borderColor: 'rgba(92, 194, 86, 1)',
                borderDash: [1, 0]
            },
            {
                label: 'Coupon',
                data: this.data.map(x => x.Coupon_revenue),
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderDash: [1, 0]
            }
      ];

      let options = 
      {
            title: {
                display: false,
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
            },
            legend: {
                position: 'bottom'
            }
      }
      if (this.chartRevenueLine)
         this.chartRevenueLine.destroy();

      this.chartRevenueLine = this._chart.lineChart(this.chartRevenue, this.data.map(x => x.Date), datasets, options);
      this.chartRevenueLine.render();
  }


  drawChartQuantity()
  {
      let datasets: LineChartDataset[] = 
        [
            {
                label: 'Total',
                data: this.data.map(x => x.TotalNumber),
                backgroundColor: 'rgba(255, 110, 0, 0.0)',
                borderColor: 'rgba(255, 110, 0, 1.0)',
                borderDash: [1, 0]
            },
            {
                label: 'Purchase',
                data: this.data.map(x => x.Purchase_number),
                backgroundColor: 'rgba(0, 255, 17, 0.2)',
                borderColor: 'rgba(92, 194, 86, 1)',
                borderDash: [1, 0]
            },
            {
                label: 'Coupon',
                data: this.data.map(x => x.Coupon_number),
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderDash: [1, 0]
            }
        ];

      let options = 
        {
            title: {
                display: false,
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
            },
            legend: {
                position: 'bottom'
            }
        }
      if (this.chartQuantityLine)
         this.chartQuantityLine.destroy();
      this.chartQuantityLine = this._chart.lineChart(this.chartQuantity, this.data.map(x => x.Date), datasets, options);
      this.chartQuantityLine.render();
  }

  

  private isWithinAllowedPeriodRange()
  {
      if (Math.abs(moment(this.dateFrom).diff(moment(this.dateTo), "months")) > this.maxAllowedPeriod)
            return false;
      return true;
  }

}
