import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewCustomerValidators } from './new-customer-validators';
import { ICustomer, Customer } from '../icustomer';
import { GeocoderService } from '../../shared/geocoder.service';
import { CustomerService } from '../customer.service';
import { ModalComponent } from '../../shared/modal/modal.component';
//import { ModalService } from '../../shared/modal/modal.service';

import { Settings } from '../../settings';

@Component({
  selector: 'customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css'],
  providers: [GeocoderService, CustomerService]
})
export class CustomerAddComponent implements OnInit {

  newCustomerForm: FormGroup;
  cityId: number;
  city: string;
  province: string;
  noAddress: boolean = false;

  customer: Customer = new Customer() ;

  // kossher!
  @ViewChild('m1') m1;
  @ViewChild('m2') m2;

  constructor(fb: FormBuilder, private _geocoder:GeocoderService,
              private _customerService:CustomerService,
              private _el:ElementRef) {

      this.newCustomerForm = fb.group({
          name: ['', Validators.required],
          cell: [''],
          home: [''],
          work: [''],
          otherPhone: [''],
          email: ['', Validators.compose([NewCustomerValidators.emailInvalid])],
          noAddress:[false],
          address: [''],
          postalCode: [''],
          cityId: [''],
          provinceId: [''],
          countryId: [''],
          notes: ['']
      });
  }

  ngOnInit() {
      this.cityId = +localStorage.getItem("bdCityId");
      this.province = localStorage.getItem("bdProvince");
      this.city = localStorage.getItem("bdCity");
      this.customer.cityId = this.cityId;
      this.customer.restaurantId = +localStorage.getItem("bdRestaurant");
      this.customer.postalCode = "";
  }

  toggleNoAddress() {
    this.noAddress = !this.noAddress;
  }

  cancel() {
      //this.m1.open();
      this.m1.open();
  }

  cityChange($event){
      console.log("city change invoked.");
      this.customer.cityId = +$event.value;

  }

  geoCode(){
      
  }

  submit() {
      if (this.customer.noAddress === true){
          this.postWithoutAddress();
      }
      else {
          this.postwithAddress();
      } 
  }

  private postCustomer(){
       this._customerService.addCustomer(this.customer)
            .subscribe(d => console.log(d),
            d => console.log(d));
  }

  private postwithAddress() {
      let address = this.customer.address + 
            ", " + this.city +
            ", " + this.province +
            " " + this.customer.postalCode;
        this._geocoder.geoCode(encodeURI(address))
        .subscribe(
            x => {
                if (x.confidence >= 0.8) {
                    this.customer.addressFound = true;
                    this.customer.lat = x.lat;
                    this.customer.lon = x.lon;
                    this.postCustomer();
                }
                else {
                    this.m1.open();
                }
            },
            x => {
                this.m2.open();
            }
        );
  }

  private postWithoutAddress() {
        this.customer.addressFound = false;
        this.customer.address = "";
        this.customer.postalCode = "";
        this.postCustomer();
  }

  private modalClose($event){
      if ($event.result === true) {
          this.customer.addressFound = false;
          this.postCustomer();
      }
  }

}
