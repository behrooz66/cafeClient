import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewCustomerValidators } from './new-customer-validators';
import { ICustomer, Customer } from '../icustomer';
import { GeocoderService } from '../../shared/geocoder.service';
import { CustomerService } from '../customer.service';
import { ModalComponent } from '../../shared/modal/modal.component';
//import { ModalService } from '../../shared/modal/modal.service';
import { FlashMessageService } from '../../shared/flash-message/flash-message.service';
import { FlashMessage } from '../../shared/flash-message/flash-message';
import 'rxjs/add/operator/finally';

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

  onSubmitValidationErrors:string[] = [];

  // modals!
  @ViewChild('m1') m1;
  @ViewChild('m2') m2;
  @ViewChild('mOnSumbitValidation') mOnSumbitValidation;
  @ViewChild('mWait') mWait;

  constructor(fb: FormBuilder,
              private _router:Router, 
              private _geocoder:GeocoderService,
              private _customerService:CustomerService,
              private _flashMessage:FlashMessageService) {

      this.newCustomerForm = fb.group({
          name: ['', Validators.required],
          cell: [''],
          home: [''],
          work: [''],
          otherPhone: [''],
          email: ['', Validators.compose([NewCustomerValidators.emailInvalid])],
          noAddress:[false],
          address: ['', Validators.compose([NewCustomerValidators.addressInvalid])],
          postalCode: [''],
          notes: ['']
      });
  }

  ngOnInit() {
      //todo: make sure the auth token is valid or renew it.

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
      //todo: go back somehow!
      
      this._flashMessage.addMessage("kir!", "kirtar!", true, "success", 2000, 2);
  }

  cityChange($event){
      console.log("city change invoked.");
      this.customer.cityId = +$event.value;

  }

  submit() {
      if (this.customer.noAddress === true){
          this.postWithoutAddress();
      }
      else {
          this.postwithAddress();
      } 
  }

  private onSubmitValidationWithAddress():boolean{
      this.onSubmitValidationErrors = [];
      
      if (!this.customer.cell && !this.customer.home 
        && !this.customer.work && !this.customer.otherPhone)
        this.onSubmitValidationErrors.push("At least one phone number has to be provided.");
      
      if (!this.customer.address || this.customer.address.length==0)
        this.onSubmitValidationErrors.push("You have to either provide an address or mark the \"No Address\" checkbox. ");
      if (this.onSubmitValidationErrors.length > 0) return true;
      return false;
  }

  private onSubmitValidationWithoutAddress(){
      this.onSubmitValidationErrors = [];
      if (!this.customer.cell && !this.customer.home 
        && !this.customer.work && !this.customer.otherPhone)
        this.onSubmitValidationErrors.push("At least one phone number has to be provided.");
        if (this.onSubmitValidationErrors.length > 0) return true;
      return false;
  }

  private postCustomer(){
       this._customerService.addCustomer(this.customer)
            .finally(() => {
                this.mWait.close();
            })
            .subscribe(d => {
                this._flashMessage.addMessage("", this.customer.name+" was added successfully!", true, "success", 3000, 2);
                this._router.navigate(["/customers", d]);
            }, 
            d => {
                 this._flashMessage.addMessage("Error", "Unable to save the customer. Please contact support if this is a re-occuring issue.", true, "danger", 3000, 2);
            });
  }

  private postwithAddress() {
      if (this.onSubmitValidationWithAddress()) {
        this.mOnSumbitValidation.open();
        return;
      }
      
      //start the waitbox
      this.mWait.open();

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
                    this.mWait.close();
                    this.m1.open();
                }
            },
            x => {
                this.mWait.close();
                this.m2.open();
            }
        );
  }

  private postWithoutAddress() {
        if (this.onSubmitValidationWithoutAddress()) {
            this.mOnSumbitValidation.open();
            return;
        }
        
        //start the waitbox
        this.mWait.open();

        this.customer.addressFound = false;
        this.customer.address = "";
        this.customer.postalCode = "";
        this.postCustomer();
  }

  private modalClose($event){
      if ($event.result === true) {
          this.mWait.open();
          this.customer.addressFound = false;
          this.postCustomer();
      }
  }

}
