import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { EditCustomerValidators } from './edit-customer-validators';
import { Customer } from '../icustomer';
import { GeocoderService } from '../../shared/geocoder.service';
import { CustomerService } from '../customer.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { FlashMessageService } from '../../shared/flash-message/flash-message.service';
import { FlashMessage } from '../../shared/flash-message/flash-message';

import { Observable } from 'rxjs/Observable';

import { Settings } from '../../settings';

@Component({
  selector: 'customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css'],
  providers: [ CustomerService, GeocoderService]
})
export class CustomerEditComponent implements OnInit, OnDestroy {

  editCustomerForm: FormGroup;
  city:string;
  province:string;
  customer: Customer = new Customer();

  initialAddress = {
      address: "",
      postalCode: "",
      noAddress: false
  };

  mode: string = "";
  private sub;

  onSubmitErrors: string[];

  @ViewChild('m1') m1;
  @ViewChild('m2') m2;
  @ViewChild('mOnSumbitValidation') mOnSubmitValidation;
  
  waiting = false;

  constructor(fb: FormBuilder, 
              private _geocoder:GeocoderService,
              private _customerService:CustomerService,
              private _router:Router,
              private _activatedRoute:ActivatedRoute,
              private _flashMessage: FlashMessageService) { 
      
       this.editCustomerForm = fb.group({
          name: [this.customer.name, Validators.required],
          cell: [this.customer.cell],
          home: [this.customer.home],
          work: [this.customer.work],
          otherPhone: [this.customer.otherPhone],
          email: [this.customer.email, Validators.compose([EditCustomerValidators.emailInvalid])],
          noAddress:[this.customer.noAddress],
          address: [this.customer.address],
          postalCode: [this.customer.postalCode],
          notes: [this.customer.notes]
      });

  }

  ngOnInit() {
      //this.mode = "loading";
      this.waiting = true;
      this.province = localStorage.getItem("bdProvince");
      this.city = localStorage.getItem("bdCity");
      let id = 0 ;
      this.sub = this._activatedRoute.params.subscribe(params => {
          id = +params["id"]
      });

      this._customerService.getCustomer(id)
            .subscribe(d => {
                this.customer = d;
                //this.mode = "success";
                this.initialAddress.address = this.customer.address;
                this.initialAddress.postalCode = this.customer.postalCode;
                this.initialAddress.noAddress = this.customer.noAddress;
                this.waiting = false;
            },
            d => {
                //this.mode = "error";
                this.waiting = false;
            });
  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }

  cancel() {
      //todo redirect somewhere!
  }

  toggleNoAddress() {
    this.customer.noAddress = !this.customer.noAddress;
  }


  // privates
  private hasAddressChanged():boolean {
      if (this.customer.address === this.initialAddress.address 
            && this.customer.postalCode === this.initialAddress.postalCode 
            && this.customer.noAddress === this.initialAddress.noAddress)
      return false;
      return true;
  }

  private geoCode(address:string):Observable<any> {
      return this._geocoder.geoCode(encodeURI(address));
  }

  private save() {
      this.waiting = true;
      this._customerService.updateCustomer(this.customer.id, this.customer)
        .subscribe(
            d => {
                this._flashMessage.addMessage("", this.customer.name+" was updated successfully!", true, "success", 2500, 2);
                this._router.navigate(["/customers", d.id]);
            },
            d => {
                this._flashMessage.addMessage("Error", "Unable to update the customer. Please contact support if this recurring.", false, "danger", 2500, 2);
            },
            () => {
                this.waiting = false;
            }
        );
  }

  private submit() {
      if (this.onSubmitValidation()) {
          this.mOnSubmitValidation.open();
          return;
      }
      this.waiting = true;
      
      if (this.customer.noAddress) {
          this.save();
      }
      else {
          if (this.hasAddressChanged()) {
              let address = this.customer.address + " ,"
                          + this.city + ", "
                          + this.province + " "
                          + this.customer.postalCode;
              this.geoCode(address)
                .subscribe(d => {
                     if (d.confidence >= 0.8) {
                        this.customer.addressFound = true;
                        this.customer.lat = d.lat;
                        this.customer.lon = d.lon;
                        this.save();
                    }
                    else {
                        this.waiting = false;
                        this.m1.open();

                    }
                }, 
                d => {
                    this.waiting = false;
                    this.m2.open();
                })
          }
          else {
              this.save();
          }
      }
  }

  private geocodingWarningClose($event){
      if ($event.result === true) {
          this.waiting = true;
          this.customer.addressFound = false;
          this.customer.lat = null;
          this.customer.lon = null;
          this.save();
      }
  }

  private onSubmitValidation():boolean{
      this.onSubmitErrors = [];

      if (!this.customer.cell && !this.customer.home 
          && !this.customer.work && !this.customer.otherPhone)
            this.onSubmitErrors.push("At least one phone number has to be provided.");
      
      if (!this.customer.address && !this.customer.noAddress)
            this.onSubmitErrors.push("You have to either provide an address or mark the \"No Address\" checkbox. ");

      if (this.onSubmitErrors.length > 0) return true;
      return false;
  }

}
