import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { ReservationStatusesService } from '../../shared/reservation-statuses/reservation-statuses.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessageService } from '../../shared/flash-message/flash-message.service';
import { RecordService } from '../../shared/record.service';
//import { ReservationStatusesService } from '../../shared/reservation-statuses/reservation-statuses.service';
//import { Reservation } from '../ireservation';
import { Settings } from '../../settings';
import * as moment from 'moment';

@Component({
  selector: 'reservation-by-date',
  templateUrl: './reservation-by-date.component.html',
  styleUrls: ['./reservation-by-date.component.css'],
  providers: [
     ReservationService, RecordService, ReservationStatusesService
  ]
})
export class ReservationByDateComponent implements OnInit {

  reservations = [];
  statuses = [];

  pageInfo = {
      pageSize: 5,
      index: 0
  };
  pageRecords: any[] = [];
  pages: any[] = [];

  startDate: string = "";
  endDate: string = "";

  waiting = false;

  constructor(
    private _reservationService: ReservationService,
    private _flash: FlashMessageService,
    private _record: RecordService,
    private _statuses: ReservationStatusesService
  ) { }

  ngOnInit() 
  {
     this.getStatuses();
     this.pageInfo.pageSize = Settings.reservations.pageSize;

     this.startDate = moment().format('YYYY-MM-DD');
     this.endDate = moment().format('YYYY-MM-DD');
     
     this.submit();
  }

  submit()
  {
      this.waiting = true;
      this._reservationService.getReservationsByRestaurant(this.startDate, this.endDate)
        .subscribe(
            d => {
                this.reservations = d;
                this.pageSetup();
                this.waiting = false;
            },
            d => {
                this.waiting = false;
                this._flash.addMessage("Error", "Could not retrieve reservations.", true, "danger", 2500, 2);
            }
        )
  }

  /*
  The following piece is for statuses and their updates on this page

  */

  getStatuses()
  {
      this._statuses.getStatuses()
        .subscribe(
            d => {
                this.statuses = d;
                console.log(d);
            },
            d => {
                this._flash.addMessage("Error", "Unable to fetch statuses.", true, "danger", 2500, 2);
            }
        );
  }

  private getStatusId(status: string): number {
      return this.statuses.filter(s => s.status === status)[0].id;
  }

  markAs(id, status)
  {
      var res = this.reservations.filter(r => r.id == id)[0];
      res.reservationStatusId = this.getStatusId(status);
      this._reservationService.put(id, res)
            .subscribe(
                d => {
                    this.submit();
                },
                d => {
                    console.log(d);
                    this._flash.addMessage("Error", "Operation failed.", true, "danger", 2500, 2);
                }
            );
  }


  //** Paging */

  private pageSetup()
  {
      let temp = this._record.getPageItems(this.reservations, null, null, this.pageInfo);
      this.pageRecords = temp.data;
      this.pages = new Array(temp.numberOfPages);
      if (this.pageRecords.length === 0 && this.pageInfo.index > 0) {
          this.pageInfo.index--;
          this.pageSetup();
      }
  }

  private setPage(i) {
      this.pageInfo.index = i;
      this.pageSetup();
  }

  private firstPage(){
      this.pageInfo.index = 0;
      this.pageSetup();
  }

  private lastPage(){
      this.pageInfo.index = this.pages.length - 1;
      this.pageSetup();
  }

  private nextPage() {
      if (this.pageInfo.index < this.pages.length - 1)
      {
          this.pageInfo.index ++;
          this.pageSetup();
      }
  }

  private prevPage() {
      if (this.pageInfo.index > 0)
      {
          this.pageInfo.index--;
          this.pageSetup();
      }
  }

  pageSizeChange(){
    
      this.pageSetup();
      Settings.reservations.pageSize = this.pageInfo.pageSize;
  }


}
