import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import {CustomerService} from '../customer.service';
import {ICustomer} from '../icustomer';
import {FlashMessageService} from '../../shared/flash-message/flash-message.service';
//import {CustomersFilterComponent} from './customers-filter.component';

@Component({
  selector: 'customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
  providers: [CustomerService]
})
export class CustomersListComponent implements OnInit, AfterViewInit {

  customers = [];
  filteredCustomers = [];
  pageCustomers = [];
  pageSize: number = 5;
  availablePageSizes = [3, 5, 10, 20];

  constructor(private _customerService:CustomerService,
              private _cdr:ChangeDetectorRef,
              private _flashMessage: FlashMessageService) { }

  ngOnInit() {

      this._customerService.getCustomers()
          .subscribe(d => {
              console.log(d);
              this.customers = d;
              this.filteredCustomers = this.customers;
              this.pageCustomers = this.filteredCustomers.slice(0, this.pageSize);
          }, 
          d => {
              // to do
              console.log("show some error...");
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

}
