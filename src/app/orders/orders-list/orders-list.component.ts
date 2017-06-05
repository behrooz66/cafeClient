import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';
import { FlashMessageService } from '../../shared/flash-message/flash-message.service';
import { FlashMessage } from '../../shared/flash-message/flash-message';
import { RecordService } from '../../shared/record.service';
import { OrderTypesService } from '../../shared/order-types/order-types.service';
import { Settings } from '../../settings';
import { Order } from '../iorder';

 

@Component({
  selector: 'orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
  providers: [OrderService, RecordService, OrderTypesService]
})
export class OrdersListComponent implements OnInit, OnDestroy {

  customerId: number;
  orders: Order[] = [];
  orderTypes: any[] = [];
  sub;

  showDeleted = Settings.orders.showDeletedOrders;

  @ViewChild('mWait') mWait;
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
          type: "list",
          field: "orderType.type",
          selected: ""
      },
      {
          type: "number",
          field: "price",
          from: null,
          to: null
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

  pageOrders: any[] = [];
  pages: any[] = [];

  constructor(private _activatedRoute:ActivatedRoute,
              private _orderService: OrderService,
              private _flash: FlashMessageService,
              private _record: RecordService,
              private _orderTypes: OrderTypesService) { }

  
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
      this.mWait.open();
      this._orderService.getOrdersByCustomer(this.customerId)
          .subscribe(
              d => {
                  this.orders = d;
                  this.mWait.close();
                  this.filterAndPage();
              },
              d => {
                  this.mWait.close();
                  this._flash.addMessage("Error", "Error in retrieving the orders", false, "danger", 2500, 2);
              }
      );
      this._orderTypes.getTypes().subscribe(
          d => {
              this.orderTypes = d;
          },
          d => {
              this._flash.addMessage("Error", "Error in retrieving order types.", true, "danger", 2500, 2);
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
        this._orderService.archive(this.deleteCandidateId)
            .subscribe(
                d => {
                    this.refresh();
                },
                d => {
                    this._flash.addMessage("Error", "Could not delete the order.", true, "danger", 3000, 2);
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
        this._orderService.delete(this.deletePermanentCandidateId)
            .subscribe(
                d => {
                    this.refresh();
                },
                d => {
                    this._flash.addMessage("Error", "Could not delete the order.", true, "danger", 3000, 2);
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
          this._orderService.unarchive(this.undeleteCandidateId)
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
      console.log(this.showDeleted);
      this.pageInfo.index = 0;
      this.filterAndPage();
  }

  filterAndPage(){
      this.mWait.open();
      let x = this._record.getPageItems(this.orders, this.filtersInfo, this.sortInfo, this.pageInfo);
      this.pageOrders = x.data;
      this.pages = new Array(x.numberOfPages);

      if (this.pageOrders.length === 0 && this.pages.length !==0)
        this.setPage(this.pageInfo.index - 1);

      this.mWait.close();
  }

  clearFilters() {
      this.filtersInfo[0]["from"] = null;
      this.filtersInfo[0]["to"] = null;
      this.filtersInfo[1]["selected"] = "";
      this.filtersInfo[2]["from"] = null;
      this.filtersInfo[2]["to"] = null;
      this.applyFilters();
  }

  showDeletedChange(){
      this.mWait.open();
      Settings.orders.showDeletedOrders = this.showDeleted;
      this.filtersInfo[3]["status"] = this.showDeleted;
      this.filterAndPage();
      this.mWait.close();
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
      Settings.orders.pageSize = this.pageInfo.pageSize;
  }


}
