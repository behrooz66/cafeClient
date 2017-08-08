import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileDownloaderService } from '../../shared/file-downloader.service';
import { FlashMessageService } from '../../shared/flash-message/flash-message.service';
import { ReportService } from '../report.service';
import { ReportOrderHelperService } from '../order/report-order-helper.service';
import { ReportReservationHelperService } from '../reservation/report-reservation-helper.service'
import { ReportGiftCardHelperService } from '../giftcard/report-giftcard-helper.service';
import { Chart } from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'report-index',
  templateUrl: './report-index.component.html',
  styleUrls: ['./report-index.component.css'],
  providers: [
      FileDownloaderService,
      ReportService,
      ReportOrderHelperService,
      ReportReservationHelperService,
      ReportGiftCardHelperService
  ]
})
export class ReportIndexComponent implements OnInit {

  multiplier: number = 0;

  currentMonth: any = 
  {
      ordersNumber: 0,
      ordersRevenue: 0,
      giftCardsNumber: 0,
      giftCardsRevenue: 0,
      reservationsNumber: 0,
      reservationsRevenue: 0,
      
      oWait: false,
      gWait: false,
      rWait: false
  };

  lastMonth: any =
  {
      ordersNumber: 0,
      ordersRevenue: 0,
      giftCardsNumber: 0,
      giftCardsRevenue: 0,
      reservationsNumber: 0,
      reservationsRevenue: 0,
      
      oWait: false,
      oEmpty: false,
      gWait: false,
      gEmpty: false,
      rWait: false,
      rEmpty: false
  };

  ordersQ: any = 
  {
      wait: false,
      empty: false,
      error: false
  }

  reservationsQ: any =
  {
      wait: false,
      empty: false,
      error: false
  }

  giftCardsQ: any = 
  {
      wait: false,
      empty: false,
      error: false
  }

  @ViewChild('orders') ordersChart;
  @ViewChild('reservations') reservationsChart;
  @ViewChild('giftCards') giftCardsChart;

  constructor(
    private _file: FileDownloaderService,
    private _report: ReportService,
    private _flash: FlashMessageService,
    private _helper: ReportOrderHelperService,
    private _helperR: ReportReservationHelperService,
    private _helperG: ReportGiftCardHelperService
  ) { }

  ngOnInit() 
  {
    //   this.calculateMultiplier();
    //   this.currentMonthSum();
    //   this.lastMonthSum();
    //   this.ordersQuarter();
    //   this.reservationsQuarter();
    //   this.giftCardsQuarter();
  }

  currentMonthSum()
  {
      this.currentMonth.title = this.getCurrentMonthInfo().name;
      this.currentMonth.oWait = true;
      this.currentMonth.gWait = true;
      this.currentMonth.rWait = true;

      this._report.getOrdersMonthlySum(this.getCurrentMonthInfo().start, this.getCurrentMonthInfo().end, null)
          .finally(() => {
              this.currentMonth.oWait = false;
          })
          .subscribe(
              d => {
                  this.currentMonth.ordersNumber = d[0].TotalOrders;
                  this.currentMonth.ordersRevenue = d[0].TotalRevenue;
              },
              d => {
                  this._flash.addMessage("Error", "Could not retrieve current month data", true, "danger", 2500, 2);
              } 
          );
      
      this._report.getGiftCardssMonthlySum(this.getCurrentMonthInfo().start, this.getCurrentMonthInfo().end)
          .finally(() => {
              this.currentMonth.gWait = false;
          })
          .subscribe(
              d => {
                  this.currentMonth.giftCardsNumber = d[0].TotalGiftCards;
                  this.currentMonth.giftCardsRevenue = d[0].TotalRevenue;
              },
              d => {
                  this._flash.addMessage("Error", "Could not retrieve current month data", true, "danger", 2500, 2);
              }
          );

      this._report.getReservationsMonthlySum(this.getCurrentMonthInfo().start, this.getCurrentMonthInfo().end, null)
          .finally(() => {
              this.currentMonth.rWait = false;
          })
          .subscribe(
              d => {
                  this.currentMonth.reservationsNumber = d[0].TotalReservations;
                  this.currentMonth.reservationsRevenue = d[0].TotalRevenue;
              },
              d => {
                  this._flash.addMessage("Error", "Could not retrieve current month data", true, "danger", 2500, 2);
              }
          );
  };

  lastMonthSum()
  {
      this.lastMonth.title = this.getLastMonthInfo().name;
      this.lastMonth.oWait = true;
      this.lastMonth.gWait = true;
      this.lastMonth.rWait = true;

      this._report.getOrdersMonthlySum(this.getLastMonthInfo().start, this.getLastMonthInfo().end, null)
          .finally(() => {
              this.lastMonth.oWait = false;
          })
          .subscribe(
              d => {
                  this.lastMonth.ordersNumber = d[0].TotalOrders;
                  this.lastMonth.ordersRevenue = d[0].TotalRevenue;
              },
              d => {
                  this._flash.addMessage("Error", "Could not retrieve last month data", true, "danger", 2500, 2);
              }
          );
      this._report.getGiftCardssMonthlySum(this.getLastMonthInfo().start, this.getLastMonthInfo().end)
          .finally(() => {
              this.lastMonth.gWait = false;
          })
          .subscribe(
              d => {
                  this.lastMonth.giftCardsNumber = d[0].TotalGiftCards;
                  this.lastMonth.giftCardsRevenue = d[0].TotalRevenue;
              },
              d => {
                  this._flash.addMessage("Error", "Could not retrieve last month data", true, "danger", 2500, 2);
              }
          );

      this._report.getReservationsMonthlySum(this.getLastMonthInfo().start, this.getLastMonthInfo().end, null)
          .finally(() => {
              this.lastMonth.rWait = false;
          })
          .subscribe(
              d => {
                  this.lastMonth.reservationsNumber = d[0].TotalReservations;
                  this.lastMonth.reservationsRevenue = d[0].TotalRevenue;
              },
              d => {
                  this._flash.addMessage("Error", "Could not retrieve last month data", true, "danger", 2500, 2);
              }
          );
  }

  ordersQuarter()
  {
      this.ordersQ.wait = true;
      this.ordersQ.empty = false;
      this.ordersQ.error = false;
      let data = [];
      this._report.getOrdersDailySum(this.getCurrentQuarterStart(), moment().format('YYYY-MM-DD'), 0)
          .finally(() => this.ordersQ.wait = false)
          .subscribe(
              d => {
                  data = d;
                  if (data.length > 0) 
                  {
                    data = this._helper.dailySum_chartData(data, this.getCurrentQuarterStart(), moment().format('YYYY-MM-DD'));
                    let chart = new Chart(this.ordersChart.nativeElement.getContext('2d'),
                        {
                            type: 'line',
                            data: {
                                labels: data.map(x => x.Date),
                                datasets: [
                                    {
                                        label: 'Revenue',
                                        data: data.map(x => x.TotalRevenue),
                                        backgroundColor: 'rgba(255, 110, 0, 0.0)',
                                        borderColor: 'rgba(255, 110, 0, 1.0)',
                                    }
                                ]
                            },
                            options: {
                                title: {
                                    display: true,
                                    //text: 'Daily Sales Revenue',
                                    fontSize: 16,
                                    position: 'bottom'
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
                                    position: 'bottom',
                                    display: false
                                }
                            }
                        });
                  }
                  else 
                  {
                      this.ordersQ.empty = true;
                  }
              },
              d => {
                  this.ordersQ.error = true;
              }
          );

      
  }

  reservationsQuarter()
  {
      this.reservationsQ.wait = true;
      this.reservationsQ.empty = false;
      this.reservationsQ.error = false;
      let data = [];
      this._report.getReservationsDailySum(this.getCurrentQuarterStart(), moment().format('YYYY-MM-DD'), 0)
          .finally(() => this.reservationsQ.wait = false)
          .subscribe(
              d => {
                  data = d;
                  if (data.length > 0) 
                  {
                        data = this._helperR.dailySum_chartData(data, this.getCurrentQuarterStart(), moment().format('YYYY-MM-DD'));
                        let chart = new Chart(this.reservationsChart.nativeElement.getContext('2d'), {
                                type: 'line',
                                data: {
                                    labels: data.map(x => x.Date),
                                    datasets: [
                                        {
                                            label: 'Reservations',
                                            data: data.map(x => x.TotalNumber),
                                            backgroundColor: 'rgba(255, 110, 0, 0.0)',
                                            borderColor: 'rgba(20, 1, 1, 1)',
                                            borderWidth: 1
                                        }
                                    ]
                                },
                                options: {
                                    title: {
                                        display: true,
                                        //text: 'Reservations',
                                        fontSize: 16,
                                        position: 'bottom',
                                    },
                                    scales: {
                                        yAxes: [
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
                                        position: 'bottom',
                                        display: false
                                    }
                                }
                            });
                    }
                    else
                    {
                        this.reservationsQ.empty = true;
                    }

                //console.log(data);
              },
              d => {
                  this.reservationsQ.error = true;
              }
          );
      
  }

  giftCardsQuarter()
  {
      this.giftCardsQ.wait = true;
      this.giftCardsQ.empty = false;
      this.giftCardsQ.error = false;
      let data = [];
      this._report.getGiftCardsDailySum(this.getCurrentQuarterStart(), moment().format('YYYY-MM-DD'), 0)
          .finally(() => this.giftCardsQ.wait = false)
          .subscribe(
              d => {
                  data = d;
                  console.log(data);
                  if (data.length > 0)
                  {
                      data = this._helperG.dailySum_chartData(data, this.getCurrentQuarterStart(), moment().format('YYYY-MM-DD'));
                      let chart = new Chart(this.giftCardsChart.nativeElement.getContext('2d'), {
                          type: 'line',
                          data: {
                              labels: data.map(x => x.Date),
                              datasets: [
                                  {
                                      label: 'Revenue',
                                      data: data.map(x => x.TotalRevenue),
                                      backgroundColor: 'rgba(255, 110, 0, 0.0)',
                                      borderColor: 'rgba(255, 110, 0, 1.0)',
                                  }
                              ]
                          },
                          options: {
                              title: {
                                  display: true,
                                  fontSize: 16,
                                  position: 'bottom'
                              },
                              scales: {
                                  yAxes: [
                                      {
                                          ticks:
                                          {
                                              min: 0,
                                              callback: (value, index, values) => '$'+value
                                          }
                                      }
                                  ]
                              },
                              legend: {
                                  position: 'bottom',
                                  display: false
                              }
                          }
                      });
                  }
                  else
                  {
                      this.giftCardsQ.empty = true;
                  }
              }, 
              d => {
                  this.giftCardsQ.error = true;
              }
          )
  }

  private getCurrentMonthInfo(): any
  {
      var date = new Date(), y = date.getFullYear(), m = date.getMonth();
      var firstDay = new Date(y, m, 1);
      var lastDay = new Date(y, m + 1, 0);
      let start = moment(firstDay).format('YYYY-MM-DD');
      let end = moment(lastDay).format('YYYY-MM-DD');
      let name = moment(firstDay).format('MMMM YYYY')
      return {
          start: start,
          end: end,
          name: name
      };
  }

  private getLastMonthInfo()
  {
      var date = new Date(), y = date.getFullYear(), m = date.getMonth() - 1;
      var firstDay = new Date(y, m, 1);
      var lastDay = new Date(y, m + 1, 0);
      let start = moment(firstDay).format('YYYY-MM-DD');
      let end = moment(lastDay).format('YYYY-MM-DD');
      let name = moment(firstDay).format('MMMM YYYY');
      return {
          start: start,
          end: end,
          name: name
      }
  }

  private calculateMultiplier()
  {
      let today: number = +moment().format('D');
      let total: number = +this.getCurrentMonthInfo().end.toString().substr(8,2);
      let m:number = +(today/total).toFixed(2);
      this.multiplier = m;
  }

  private getFirstDayOfCurrentYear()
  {
      var thisYear = (new Date()).getFullYear();    
      var start = new Date("1/1/" + thisYear);
      var defaultStart = moment(start.valueOf()).format('YYYY-MM-DD');
      return defaultStart;
  }

  private getCurrentQuarterStart()
  {
      return moment().quarter(moment().quarter()).startOf('quarter').format('YYYY-MM-DD');
  }




}
