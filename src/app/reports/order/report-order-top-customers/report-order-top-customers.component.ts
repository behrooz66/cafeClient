import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../../report.service';
import { FlashMessageService } from '../../../shared/flash-message/flash-message.service';
import { RecordService } from '../../../shared/record.service';
import { Settings } from '../../../settings';
import { Chart } from 'chart.js';


@Component({
  selector: 'report-order-top-customers',
  templateUrl: './report-order-top-customers.component.html',
  styleUrls: ['./report-order-top-customers.component.css'],
  providers: [
      ReportService,
      RecordService
  ]
})
export class ReportOrderTopCustomersComponent implements OnInit {

  data= [];
  sortBy: string = "revenue";
  mode: string;

  dateFrom: string = "";
  dateTo: string = "";
  minOrders: number = 2;
  minRevenue: number = 25;

  pageInfo = {
      pageSize: 5,
      index: 0
  };

  pageRecords: any[] = [];
  pages: any[] = [];

  constructor(private _report: ReportService,
              private _flash: FlashMessageService,
              private _record: RecordService)
  {

  }

  ngOnInit() 
  {
     this.pageInfo.pageSize = Settings.reports.orders.topCustomers.pageSize;
  }

  refresh() 
  {
      this.mode = "loading";
      this._report.getOrdersTopCustomers(this.dateFrom, this.dateTo, this.minRevenue, this.minOrders)
          .subscribe(
              d => {
                  this.data = d;
                  this.mode = "success";
                  this.sortByRevenue();
              },
              d => {
                  this._flash.addMessage("Error", "Error in retrieving the report.", true, "danger", 2500, 2);
                  this.mode = "error";
              }
          )
  }

  private sortByRevenue() {
      this.sortBy = "revenue";
      let temp = this._record.getPageItems(this.data, null, { field: 'revenue', order: 'desc'}, this.pageInfo);
      this.pageRecords = temp.data;
      this.pages = new Array(temp.numberOfPages);
  }

  private sortByQuantity() {
      this.sortBy = "orders";
      let temp = this._record.getPageItems(this.data, null, { field: 'orders', order: 'desc'}, this.pageInfo);
      this.pageRecords = temp.data;
      this.pages = new Array(temp.numberOfPages);
  }


  //********* PAGING  */
  private sort(){
      if (this.sortBy === 'revenue') 
            this.sortByRevenue();
      else  
            this.sortByQuantity();
  }

  private setPage(i) {
      this.pageInfo.index = i;
      this.sort();
  }

  private firstPage(){
      this.pageInfo.index = 0;
      this.sort();
  }

  private lastPage(){
      this.pageInfo.index = this.pages.length - 1;
      this.sort();
  }

  private nextPage() {
      if (this.pageInfo.index < this.pages.length - 1)
      {
          this.pageInfo.index ++;
          this.sort();
      }
  }

  private prevPage() {
      if (this.pageInfo.index > 0)
      {
          this.pageInfo.index--;
          this.sort();
      }
  }

  pageSizeChange(){
      Settings.reports.orders.topCustomers.pageSize = this.pageInfo.pageSize;
  }

}
