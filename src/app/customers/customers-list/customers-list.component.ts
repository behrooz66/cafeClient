import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild } from '@angular/core';
import {CustomerService} from '../customer.service';
import {ICustomer} from '../icustomer';
import { FlashMessageService } from '../../shared/flash-message/flash-message.service';
import { FlashMessage } from '../../shared/flash-message/flash-message';
import { ModalComponent } from '../../shared/modal/modal.component';
import { PagerService } from '../../shared/pager.service';
import { Router } from '@angular/router';
import { Settings } from '../../settings';

@Component({
  selector: 'customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
  providers: [CustomerService, PagerService]
})
export class CustomersListComponent implements OnInit {

  customers = [];
  filteredCustomers = [];
  
  @ViewChild('mConfirmDelete') mConfirmDelete;
  @ViewChild('mConfirmPermanentDelete') mConfirmPermanentDelete;
  @ViewChild('mWait') mWait;

  pageCustomers = [];
  pages = [];
  pageOptions = {
      pageSize: 5,
      index: 0
  };

  constructor(private _customerService:CustomerService,
              private _cdr:ChangeDetectorRef,
              private _flashMessage: FlashMessageService,
              private _router: Router,
              private _pager: PagerService) { }

  ngOnInit() {
      this.refresh();
  }

  refresh() {
      this.mWait.open();
      this._customerService.getCustomers()
          .subscribe(d => {
              this.customers = d;
              if (!Settings.customers.showDeletedCustomers)
                  this.filteredCustomers = this.customers.filter(c => !c.deleted);
              else
                  this.filteredCustomers = this.customers;
              this.pagingSetup();
              this.mWait.close();
          },
          d => {
              this.mWait.close();
              this._flashMessage.addMessage("Error", "Could not retrieve customer. Please refresh.", false, "danger", 2000, 2);
          });
  }

  filter($event){
    this.filteredCustomers = $event.result;
    this.pagingSetup();
  }

  edit(id) {
      this._router.navigate(["/customers/edit/", id]);
  }

  delete(id) {
      this.mConfirmDelete.open();
      this.deleteCandidateId = id;
  }

  private deleteCandidateId:number;
  private mConfirmDeleteClose($event){
      if ($event.result === true) {
          this.mWait.open();
          this._customerService.archiveCustomer(this.deleteCandidateId)
              .subscribe(d => {
                  let index = this.filteredCustomers.indexOf(this.filteredCustomers.filter(x => x.id == this.deleteCandidateId)[0]);
                  this.filteredCustomers[index].deleted = true;
                  if (!Settings.customers.showDeletedCustomers)
                      this.filteredCustomers.splice(index, 1);
                  this.pagingSetup();
                  this.mWait.close();
                  this._flashMessage.addMessage("", "Customer successfully deleted.", true, "success", 2500, 2);
              },
              d => {
                  this.mWait.close();
                  this._flashMessage.addMessage("Error", "Could not delete customer. Please contact support if this is recurring.", false, "danger", 2500, 2);
              });
     }
  }

  permanentDelete(id) {
      this.mConfirmPermanentDelete.open();
      this.permanentDeleteCandidateId = id;
  }
  private permanentDeleteCandidateId: number;
  private mConfirmPermanentDeleteClose($event) {
      if ($event.result === true){
          this.mWait.open();
          this._customerService.deleteCustomer(this.permanentDeleteCandidateId)
                .subscribe(d => {
                    let index = this.filteredCustomers.indexOf(this.filteredCustomers.filter(x => x.id == this.deleteCandidateId)[0]);
                    this.filteredCustomers.splice(index, 1);
                    this.pagingSetup();
                    this.mWait.close();
                    this._flashMessage.addMessage("", "Customer successfully deleted.", true, "success", 2500, 2); 
                },
                d => {
                    this.mWait.close();
                    this._flashMessage.addMessage("Error", "Could not delete customer. Please contact support if this is recurring.", false, "danger", 2500, 2);
                });
      }
  }

  addOrder(id){
      this._router.navigate(["/orders/add/", id]);
  }

  addGiftCard(id){
      this._router.navigate(["/giftcards/add/", id]);
  }

  addReservation(id){
      this._router.navigate(["/reservations/add/", id]);
  }

  history(id) {
      this._router.navigate(["/customers/history/", id]);
  }



  //******************* */
  private pagingSetup() {
      console.log(this.filteredCustomers.length);
      this.pages = new Array(this._pager.totalPages(this.filteredCustomers.length, this.pageOptions.pageSize));
      this.pageCustomers = this.filteredCustomers.slice(this._pager.startIndex(this.pageOptions.pageSize, this.pageOptions.index), 
          this._pager.endIndex(this.filteredCustomers.length, this.pageOptions.pageSize, this.pageOptions.index));
      if (this.pageCustomers.length === 0 && this.pageOptions.index > 0) {
          this.pageOptions.index--;
          this.pagingSetup();
      }
  }

  private setPage(i: number) {
      this.pageOptions.index = i;
      this.pagingSetup();
  }

  private nextPage() {
      if (this.pageOptions.index < this.pages.length - 1)
         this.setPage(this.pageOptions.index+1);
  }

  private prevPage() {
      if (this.pageOptions.index > 0)
      this.setPage(this.pageOptions.index-1);
  }

  private lastPage() {
      this.setPage(this.pages.length - 1);
  }

  private firstPage() {
      this.setPage(0);
  }
}
