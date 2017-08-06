import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../../report.service';
import { ReportReservationHelperService } from '../report-reservation-helper.service';
import { FlashMessageService } from '../../../shared/flash-message/flash-message.service';
import { Settings } from '../../../settings';
import { Chart } from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'report-reservation-daily-sum',
  templateUrl: './report-reservation-daily-sum.component.html',
  styleUrls: ['./report-reservation-daily-sum.component.css'],
  providers:[
      ReportService,
      ReportReservationHelperService
  ]
})
export class ReportReservationDailySumComponent implements OnInit {

  data = [];
  dateFrom: string;
  dateTo: string;
  statusId: number = 0;
  mode: string;

  maxAllowedPeriod: number;

  @ViewChild('chartRevenue') chartRevenue;
  @ViewChild('chartQuantity') chartQuantity;
  
  constructor(private _report: ReportService,
              private _flash: FlashMessageService,
              private _helper: ReportReservationHelperService)
  { }

  ngOnInit() 
  {
      this.maxAllowedPeriod = Settings.reports.reservations.dailySum.maximumPeriodAllowed;
      this.dateTo = moment().format("YYYY-MM-DD");
      this.dateFrom = moment(moment().subtract(2, "months")).format("YYYY-MM-DD");
  }


  refresh() 
  {
      if (this.isWithinAllowedPeriodRange())
      {
          this.mode = "loading";
          this._report.getReservationsDailySum(this.dateFrom, this.dateTo, this.statusId)
            .subscribe(
                d => {
                    this.data = d;
                    // this.addTotals();
                    // this.normalizeData();
                    this.data = this._helper.dailySum_addTotals(this.data);
                    this.data = this._helper.dailySum_normalizeData(this.data);
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


  drawChartRevenue()
  {
      let chart = new Chart(this.chartRevenue.nativeElement.getContext('2d'), {
          type: 'line',
          data: {
              labels: this.data.map(x => x.Date),
              datasets: [
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
                      borderColor: 'rgba(92, 194, 86, 1)'
                  },
                  {
                      label: 'Unspecified',
                      data: this.data.map(x => x.Unspecified_revenue),
                      backgroundColor: 'rgba(0, 125, 17, 0.2)',
                      borderColor: 'rgba(45, 94, 32, 1)'
                  },
              ]
          },
          options:{
              title: {
                  display: true,
                  text: 'Daily Reservations (recorded) Revenue',
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


  drawChartQuantity()
  {
      let chart = new Chart(this.chartQuantity.nativeElement.getContext('2d'), {
          type: 'line',
          data: {
              labels: this.data.map(x => x.Date),
              datasets: [
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
                      borderColor: 'rgba(92, 194, 86, 1)'
                  },
                  {
                      label: 'Not Shown',
                      data: this.data.map(x => x.NotShown_number),
                      backgroundColor: 'rgba(0, 123, 255, 0.2)',
                      borderColor: 'rgba(0, 123, 255, 1)'
                  },
                  {
                      label: 'Cancelled',
                      data: this.data.map(x => x.Cancelled_number),
                      backgroundColor: 'rgba(247, 59, 59, 0.2)',
                      borderColor: 'rgba(247, 59, 59, 1)'
                  },
                  {
                      label: 'Unspecified',
                      data: this.data.map(x => x.Unspecified_number),
                      backgroundColor: 'rgba(0, 125, 17, 0.2)',
                      borderColor: 'rgba(45, 94, 32, 1)'
                  },
              ]
          },
          options:{
              title: {
                  display: true,
                  text: 'Daily Reservation Numbers',
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
  

  // ********************************//

//   private normalizeData() 
//   {
//       let index = -1;
//       while (index < this.data.length - 1) {
//           index++;
//           if (index + 1 >= this.data.length)
//               break;
//           let date = this.data[index].Date;
//           let date2 = this.data[index + 1].Date;
          
//           if (this.isDateGap(date, date2)) {
//               this.fillTheGap(date, date2, index);
//           }
//       }
//   }

//   // inserts an all-zero object everywhere there is gap between two actual days with non-zero values.
//   private fillTheGap(date1: string, date2: string, startIndex: number)
//   {
//       let d1 = moment(date1).format('YYYY-MM-DD');
//       let d2 = moment(date2).format('YYYY-MM-DD');
//       let d3 = moment(date1).add(1, 'days').format('YYYY-MM-DD');
//       while (d3 !== d2) {
//           this.data.splice(++startIndex, 0, {
//               Date: d3,
//               ShownUp_revenue: 0,
//               ShownUp_number: 0,
//               NotShown_revenue: 0,
//               NotShown_number: 0,
//               Cancelled_revenue: 0,
//               Cancelled_number: 0,
//               Unspecified_revenue: 0,
//               Unspecified_number: 0,
//               TotalRevenue: 0,
//               TotalNumber: 0
//           });
//           d3 = moment(d3).add(1, 'days').format('YYYY-MM-DD');
//       }

//   }

//   private isDateGap(date1: string, date2: string) {
//       let d1 = moment(date1);
//       let d2 = moment(date2);
//       return Math.abs(d1.diff(d2, 'days')) > 1 ? true : false
//   }

//   // unifies the date format for all, and adds the total revenue and total number to each item.
//   private addTotals(){
//       this.data.forEach(e => {
//           if (e.Date.length > 10) e.Date = e.Date.substr(0, 10);
//           e.TotalRevenue = e.ShownUp_revenue + e.Unspecified_revenue;
//           e.TotalNumber = e.ShownUp_number + e.NotShown_number + e.Cancelled_number + e.Unspecified_number;
//       });
//   }

  private isWithinAllowedPeriodRange(){
      if (Math.abs(moment(this.dateFrom).diff(moment(this.dateTo), "months")) > this.maxAllowedPeriod)
            return false;
      return true;
  }
}
