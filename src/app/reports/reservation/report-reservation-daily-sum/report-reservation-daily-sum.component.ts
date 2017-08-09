import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../../report.service';
import { ReportReservationHelperService } from '../report-reservation-helper.service';
import { FlashMessageService } from '../../../shared/flash-message/flash-message.service';
import { Settings } from '../../../settings';
import { Chart } from 'chart.js';
import { ChartService, LineChartDataset, LineChartOptions } from '../../../shared/chart.service';
import * as moment from 'moment';

@Component({
  selector: 'report-reservation-daily-sum',
  templateUrl: './report-reservation-daily-sum.component.html',
  styleUrls: ['./report-reservation-daily-sum.component.css'],
  providers:[
      ReportService,
      ReportReservationHelperService,
      ChartService
  ]
})
export class ReportReservationDailySumComponent implements OnInit {

  data = [];
  dateFrom: string;
  dateTo: string;
  statusId: number = 0;
  mode: string;
  empty: boolean = false;

  maxAllowedPeriod: number;

  @ViewChild('chartRevenue') chartRevenue;
  @ViewChild('chartQuantity') chartQuantity;
  
  constructor(
        private _report: ReportService,
        private _flash: FlashMessageService,
        private _helper: ReportReservationHelperService,
        private _chart: ChartService
        )
  { }

  ngOnInit() 
  {
      this.maxAllowedPeriod = Settings.reports.reservations.dailySum.maximumPeriodAllowed;
      this.dateTo = moment().format("YYYY-MM-DD");
      this.dateFrom = moment(moment().subtract(2, "months")).format("YYYY-MM-DD");
  }


  refresh() 
  {
      this.empty = false;
      if (this.isWithinAllowedPeriodRange())
      {
          this.mode = "loading";
          this._report.getReservationsDailySum(this.dateFrom, this.dateTo, this.statusId)
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
      let datasets: LineChartDataset[] = [
          {
              label: 'Total',
              data: this.data.map(x => x.TotalRevenue),
              backgroundColor: 'rgba(255, 110, 0, 0.0)',
              borderColor: 'rgba(20, 1, 1, 1)',
              borderDash: [7, 5]
          },
          {
                label: 'Shown Up',
                data: this.data.map(x => x.ShownUp_revenue),
                backgroundColor: 'rgba(0, 255, 17, 0.2)',
                borderColor: 'rgba(92, 194, 86, 1)',
                borderDash: [1, 0]   
          },
          {
                label: 'Unspecified',
                data: this.data.map(x => x.Unspecified_revenue),
                backgroundColor: 'rgba(0, 125, 17, 0.2)',
                borderColor: 'rgba(45, 94, 32, 1)',
                borderDash: [1, 0]
          },
      ];

      //let options = new LineChartOptions();
      let options = {
          title: {
                display: false,
                text: 'Daily Reservations [Recorded] Revenue',
                fontSize: 16
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            min: 0,
                            callback: (value, index, values) => '$'+value
                        }
                    }
                ]
            },
            legend: {
                position: 'bottom'
            }
      }
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
                      borderColor: 'rgba(20, 1, 1, 1)',
                      borderDash: [7, 5]
                  },
                  {
                      label: 'Shown Up',
                      data: this.data.map(x => x.ShownUp_number),
                      backgroundColor: 'rgba(0, 255, 17, 0.2)',
                      borderColor: 'rgba(92, 194, 86, 1)',
                      borderDash: [1, 0]
                  },
                  {
                      label: 'Not Shown',
                      data: this.data.map(x => x.NotShown_number),
                      backgroundColor: 'rgba(0, 123, 255, 0.2)',
                      borderColor: 'rgba(0, 123, 255, 1)',
                      borderDash: [1, 0]
                  },
                  {
                      label: 'Cancelled',
                      data: this.data.map(x => x.Cancelled_number),
                      backgroundColor: 'rgba(247, 59, 59, 0.2)',
                      borderColor: 'rgba(247, 59, 59, 1)',
                      borderDash: [1, 0]
                  },
                  {
                      label: 'Unspecified',
                      data: this.data.map(x => x.Unspecified_number),
                      backgroundColor: 'rgba(0, 125, 17, 0.2)',
                      borderColor: 'rgba(45, 94, 32, 1)',
                      borderDash: [1, 0]
                  },
      ];
      //let options = new LineChartOptions();
      let options = {
          title: {
                display: false,
                text: 'Daily Reservation Numbers',
                fontSize: 16
            },
         scales: {
            yAxes: [
                {
                    ticks: {
                        min: 0,
                        callback: (value, index, values) => Math.floor(value) === value? value : null
                    }
                }
            ]
            },
            legend: {
                position: 'bottom'
            }
      }

      let chart = this._chart.lineChart(this.chartQuantity, this.data.map(x => x.Date), datasets, options);
      chart.render();

  }

  private isWithinAllowedPeriodRange(){
      if (Math.abs(moment(this.dateFrom).diff(moment(this.dateTo), "months")) > this.maxAllowedPeriod)
            return false;
      return true;
  }
}
