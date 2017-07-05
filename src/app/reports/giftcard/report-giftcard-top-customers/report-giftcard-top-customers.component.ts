import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../../report.service';
import { FlashMessageService } from '../../../shared/flash-message/flash-message.service';
import { GiftcardTypeService } from '../../../shared/giftcard-type/giftcard-type.service';
import { RecordService } from '../../../shared/record.service';
import { Settings } from '../../../settings';

@Component({
  selector: 'report-giftcard-top-customers',
  templateUrl: './report-giftcard-top-customers.component.html',
  styleUrls: ['./report-giftcard-top-customers.component.css'],
    providers: [
      ReportService,
      RecordService,
      GiftcardTypeService
  ]
})
export class ReportGiftcardTopCustomersComponent implements OnInit {

  data= [];
  sortBy: string = "revenue";
  mode: string;

  dateFrom: string = "";
  dateTo: string = "";
  minCards: number = 2;
  minRevenue: number = 25;
  typeId: number = 0;

  giftCardTypesMode: string;
  giftCardTypes;

  pageInfo = {
      pageSize: 5,
      index: 0
  };

  pageRecords: any[] = [];
  pages: any[] = [];

  constructor(private _report: ReportService,
              private _flash: FlashMessageService,
              private _record: RecordService,
              private _gt: GiftcardTypeService)
  {

  }

  ngOnInit() 
  {
      this.getGiftCardTypes();
      this.pageInfo.pageSize = Settings.reports.giftCards.topCustomers.pageSize;
  }

  refresh() 
  {
      this.mode = "loading";
      this._report.getGiftCardsTopCustomers(this.dateFrom, this.dateTo, this.minRevenue, this.minCards, this.typeId)
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

  private getGiftCardTypes() 
  {
      this.giftCardTypesMode = "loading";
      this._gt.getTypes()
          .subscribe(
              d => {
                  this.giftCardTypes = d;
                  this.giftCardTypesMode = "success";
              },
              d => {
                  this._flash.addMessage("Error", "Error in retrieving gift card types.", true, "danger", 2500, 2);
                  this.giftCardTypesMode = "error";
              }
          );
  }

  private sortByRevenue() 
  {
      this.sortBy = "revenue";
      let temp = this._record.getPageItems(this.data, null, { field: 'revenue', order: 'desc'}, this.pageInfo);
      this.pageRecords = temp.data;
      this.pages = new Array(temp.numberOfPages);
  }

  private sortByQuantity() 
  {
      this.sortBy = "giftCards";
      let temp = this._record.getPageItems(this.data, null, { field: 'giftCards', order: 'desc'}, this.pageInfo);
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
      Settings.reports.giftCards.topCustomers.pageSize = this.pageInfo.pageSize;
  }

}
