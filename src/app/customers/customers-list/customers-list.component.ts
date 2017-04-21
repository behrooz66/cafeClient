import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild } from '@angular/core';
import {CustomerService} from '../customer.service';
import {ICustomer} from '../icustomer';
import {FlashMessageService} from '../../shared/flash-message/flash-message.service';
import { FlashMessage } from '../../shared/flash-message/flash-message';
import { ModalComponent } from '../../shared/modal/modal.component';
//import {CustomersFilterComponent} from './customers-filter.component';

@Component({
  selector: 'customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
  providers: [CustomerService]
})
export class CustomersListComponent implements OnInit, AfterViewInit {

  loading = false;
  customers = [];
  filteredCustomers = [];
  pageCustomers = [];
  pageSize: number = 5;
  availablePageSizes = [3, 5, 10, 20];

  @ViewChild('mConfirmDelete') mConfirmDelete;

  constructor(private _customerService:CustomerService,
              private _cdr:ChangeDetectorRef,
              private _flashMessage: FlashMessageService) { }

  ngOnInit() {
      this.loading = true;
      this._customerService.getCustomers()
          .subscribe(d => {
              console.log(d);
              this.customers = d;
              this.filteredCustomers = this.customers;
              this.pageCustomers = this.filteredCustomers.slice(0, this.pageSize);
              this.loading = false;
          }, 
          d => {
              // todo
              console.log("show some error...");
              this.loading = false;
          });
  }

  ngAfterViewInit(){
    this._cdr.detectChanges();
  }

  filter($event){
    this.filteredCustomers = $event.result;
    this.pageIndexChange({
      startIndex: 0,
      endIndex: this.pageSize
    });
    this._cdr.detectChanges();
  }

  pageIndexChange($event){
    this.pageCustomers = this.filteredCustomers.slice($event.startIndex, $event.endIndex);
  }

  delete(id) {
      this.mConfirmDelete.open();
      this.deleteCandidateId = id;
  }

  private deleteCandidateId:number;
  private mConfirmDeleteClose($event){
      if ($event.result === true) {
          this._customerService.deleteCustomer(this.deleteCandidateId)
              .subscribe(d => {
                  this._flashMessage.addMessage("", "Customer successfully deleted.", true, "success", 2500, 2);
              },
              d => {
                  this._flashMessage.addMessage("Error", "Could not delete customer. Please contact support if this is recurring.", false, "danger", 2500, 2);
                  console.log("kior");
              },
              () => {
                  // todo anything?
              });
      }
  }

}
