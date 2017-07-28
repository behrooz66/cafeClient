import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileDownloaderService } from '../../shared/file-downloader.service';
import { FlashMessageService } from '../../shared/flash-message/flash-message.service';
import { ReportService } from '../report.service';
import * as moment from 'moment';

@Component({
  selector: 'report-index',
  templateUrl: './report-index.component.html',
  styleUrls: ['./report-index.component.css'],
  providers: [
      FileDownloaderService,
      ReportService
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
      gWait: false,
      rWait: false
  };




  constructor(
    private _file: FileDownloaderService,
    private _report: ReportService,
    private _flash: FlashMessageService
  ) { }

  ngOnInit() 
  {
      this.calculateMultiplier();
      this.currentMonthSum();
      this.lastMonthSum();
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


}
