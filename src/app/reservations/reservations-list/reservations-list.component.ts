import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessageService } from '../../shared/flash-message/flash-message.service';
import { RecordService } from '../../shared/record.service';
import { ReservationStatusesService } from '../../shared/reservation-statuses/reservation-statuses.service';
import { Reservation } from '../ireservation';
import { Settings } from '../../settings';

@Component({
  selector: 'reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.css'],
  providers: [ReservationService, ReservationStatusesService, RecordService]
})
export class ReservationsListComponent implements OnInit {

  customerId: number;
  reservations: Reservation[] = [];
  reservationStatuses: any[] = [];
  sub;

  showDeleted = Settings.orders.showDeletedOrders;

  waiting: boolean = false;
  @ViewChild('mConfirmDelete') mConfirmDelete;
  @ViewChild('mConfirmPermanentDelete') mConfirmPermanentDelete;
  @ViewChild('mConfirmUndelete') mConfirmUndelete;


  filtersInfo = [
      {
          type: "date",
          field: "date",
          from: "",
          to: ""
      },
      {
          type: "number",
          field: "revenue",
          from: null,
          to: null
      },
      {
          type: "list",
          field: "reservationStatus.status",
          selected: ""
      },
      {
          type: "boolean",
          field: "deleted",
          status: this.showDeleted
      }
  ];

  pageInfo = {
      pageSize: 5,
      index: 0
  };
  sortInfo = {};

  pageReservations: any[] = [];
  pages: any[] = [];

  constructor(private _activatedRoute:ActivatedRoute,
              private _reservationService: ReservationService,
              private _flash: FlashMessageService,
              private _record: RecordService,
              private _reservationStatuses: ReservationStatusesService ) { }

  showFilters = false;
  toggle()
  {
      this.showFilters = !this.showFilters;
  }

  ngOnInit() {
      this.pageInfo.pageSize = Settings.orders.pageSize;
      this.sub = this._activatedRoute.params.subscribe(params => {
          this.customerId = +params["customerId"];
      });
      this.refresh();
  }

  refresh() {
      this.waiting = true;
      this._reservationService.getReservationsByCustomer(this.customerId)
          .subscribe(
              d => {
                  this.reservations = d;
                  this.waiting = false;
                  this.filterAndPage();
              },
              d => {
                  this.waiting = false;
                  this._flash.addMessage("Error", "Error in retrieving the reservations", false, "danger", 2500, 2);
              }
      );
      this._reservationStatuses.getStatuses().subscribe(
          d => {
              this.reservationStatuses = d;
          },
          d => {
              this._flash.addMessage("Error", "Error in retrieving reservation statuses.", true, "danger", 2500, 2);
          }
      );      
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  delete(id)
  {
      this.mConfirmDelete.open();
      this.deleteCandidateId = id;
  }

  deleteCandidateId: number;
  private mConfirmDeleteClose($event) 
  {
      if ($event.result === true) {
        this._reservationService.archive(this.deleteCandidateId)
            .subscribe(
                d => {
                    this.refresh();
                },
                d => {
                    this._flash.addMessage("Error", "Could not delete the reservation.", true, "danger", 3000, 2);
                }
            );
      }
  }

  deletePermanent(id){
      this.mConfirmPermanentDelete.open();
      this.deletePermanentCandidateId = id;
  }

  deletePermanentCandidateId: number;
  mConfirmDeletePermanentClose($event) {
    if ($event.result === true) {
        this._reservationService.delete(this.deletePermanentCandidateId)
            .subscribe(
                d => {
                    this.refresh();
                },
                d => {
                    this._flash.addMessage("Error", "Could not delete the reservation.", true, "danger", 3000, 2);
                }
            );
    }
  }

  undelete(id){
      this.mConfirmUndelete.open();
      this.undeleteCandidateId = id;
  }

  undeleteCandidateId: number;
  mConfirmUndeleteClose($event) {
      if ($event.result === true) {
          this._reservationService.unarchive(this.undeleteCandidateId)
              .subscribe(
                  d => {
                      this.refresh();
                  },
                  d => {
                      this._flash.addMessage("Error", "Could not perform the operation.", true, "danger", 3000, 2);
                  }
              );
      }
  }


  //*** FILTERS */
  applyFilters() {
      this.pageInfo.index = 0;
      this.filterAndPage();
  }

  filterAndPage(){
      this.waiting = true;
      let x = this._record.getPageItems(this.reservations, this.filtersInfo, this.sortInfo, this.pageInfo);
      this.pageReservations = x.data;
      this.pages = new Array(x.numberOfPages);

      if (this.pageReservations.length === 0 && this.pages.length !==0)
        this.setPage(this.pageInfo.index - 1);

      this.waiting = false;
  }

  clearFilters() {
      this.filtersInfo[0]["from"] = null;
      this.filtersInfo[0]["to"] = null;
      this.filtersInfo[1]["from"] = null;
      this.filtersInfo[1]["to"] = null;
      this.filtersInfo[2]["selected"] = "";
      this.applyFilters();
  }

  showDeletedChange(){
      this.waiting = true;
      Settings.reservations.showDeletedReservations = this.showDeleted;
      this.filtersInfo[3]["status"] = this.showDeleted;
      this.filterAndPage();
      this.waiting = false;
  }


  //*** PAGING  */
  private setPage(i) {
      this.pageInfo.index = i;
      this.filterAndPage();
  }

  private firstPage(){
      this.pageInfo.index = 0;
      this.filterAndPage();
  }

  private lastPage(){
      this.pageInfo.index = this.pages.length - 1;
      this.filterAndPage();
  }

  private nextPage() {
      if (this.pageInfo.index < this.pages.length - 1)
      {
          this.pageInfo.index ++;
          this.filterAndPage();
      }
  }

  private prevPage() {
      if (this.pageInfo.index > 0)
      {
          this.pageInfo.index--;
          this.filterAndPage();
      }
  }

  pageSizeChange(){
      Settings.reservations.pageSize = this.pageInfo.pageSize;
  }


}
