import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileDownloaderService } from '../../shared/file-downloader.service';
import { FlashMessageService } from '../../shared/flash-message/flash-message.service';
import { ReportService } from '../report.service';
import { ReportOrderHelperService } from '../order/report-order-helper.service';
import { ReportReservationHelperService } from '../reservation/report-reservation-helper.service'
import { ReportGiftCardHelperService } from '../giftcard/report-giftcard-helper.service';
import { Chart } from 'chart.js';
import { ChartService } from '../../shared/chart.service';
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
      ReportGiftCardHelperService,
      ChartService
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

  @ViewChild('trial') trial;

  constructor(
    private _file: FileDownloaderService,
    private _report: ReportService,
    private _flash: FlashMessageService,
    private _helper: ReportOrderHelperService,
    private _helperR: ReportReservationHelperService,
    private _helperG: ReportGiftCardHelperService,
    private _chart: ChartService
  ) { }

  ngOnInit() 
  {
       this.calculateMultiplier();
       this.currentMonthSum();
       this.lastMonthSum();
       this.ordersQuarter();
       this.reservationsQuarter();
       this.giftCardsQuarter();
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

        let s = this.getCurrentQuarterStart();
        let e = moment().format('YYYY-MM-DD');
        this._report.getOrdersMonthlySum(s, e, 0)
            .finally(
                () => this.ordersQ.wait = false
            )
            .subscribe(
                d => 
                {
                    if (d.length > 0)
                    {
                        let x = this._helper.monthlySum_prepareDataForRevenueBarChart(d);
                        let options = {
                            title: {
                                display: false,
                                text: 'Revenue by Month',
                                fontSize: 16
                            },
                            scales:{
                                yAxes:[
                                    {
                                        ticks: {
                                            min: 0,
                                            callback: (value, index, values) => '$' + value
                                        }
                                    }
                                ]
                            },
                            legend: {
                                position: 'bottom'
                            }
                        };
                    let chart = this._chart.BarChart(this.ordersChart, x.labels, x.datasets, options);
                    chart.render(); 
                    }
                    else 
                        this.ordersQ.empty = true;
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
      
      let s = this.getCurrentQuarterStart();
      let e = moment().format('YYYY-MM-DD');
      this._report.getReservationsMonthlySum(s, e, 0)
          .finally(() => this.reservationsQ.wait = false)
          .subscribe(
              d => {
                  if (d.length > 0)
                  {
                      let x = this._helperR.monthlySum_prepareDataForQuantityBarChart(d);
                      let options = {
                            title: {
                                display: false,
                                text: 'Reservations by Month',
                                fontSize: 16
                            },
                            scales:{
                                yAxes:[
                                    {
                                        ticks: {
                                            min: 0,
                                            callback: function(value, index, values) {
                                                if (Math.floor(value) === value) {
                                                    return value;
                                                }
                                            }
                                        }
                                    }
                                ]
                            },
                            legend: {
                                position: 'bottom'
                            }
                        };
                        let chart = this._chart.BarChart(this.reservationsChart, x.labels, x.datasets, options);
                        chart.render();
                  }
                  else 
                      this.reservationsQ.empty = true;
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
     
        let s = this.getCurrentQuarterStart();
        let e = moment().format('YYYY-MM-DD');
        this._report.getGiftCardssMonthlySum(s, e)
            .finally(() => this.giftCardsQ.wait = false)
            .subscribe(
                d => 
                {
                    if (d.length > 0) 
                    {
                        let x = this._helperG.monthlySum_prepareDataForRevenueBarChart(d);
                        let options = {
                            title: {
                                display: false,
                                text: 'Revenue by Month',
                                fontSize: 16
                            },
                            scales:{
                                yAxes:[
                                    {
                                        ticks: {
                                            min: 0,
                                            callback: (value, index, values) => '$' + value
                                        }
                                    }
                                ]
                            },
                            legend: {
                                position: 'bottom'
                            }
                        };
                        let chart = this._chart.BarChart(this.giftCardsChart, x.labels, x.datasets, options);
                        chart.render();
                    }
                    else 
                        this.giftCardsQ.empty = true;
                },
                d => 
                {
                    this.giftCardsQ.error = true;
                }
            );
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
