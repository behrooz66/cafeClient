import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { EditCustomerValidators } from './edit-customer-validators';
import { Customer } from '../icustomer';
import { GeocoderService } from '../../shared/geocoder.service';
import { CustomerService } from '../customer.service';
import { ModalComponent } from '../../shared/modal/modal.component';

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

  mode: string = "";
  private sub;

  constructor(fb: FormBuilder, private _geocoder:GeocoderService,
              private _customerService:CustomerService,
              private _activatedRoute:ActivatedRoute) { 
      
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
      this.mode = "loading";
      this.province = localStorage.getItem("bdProvince");
      this.city = localStorage.getItem("bdCity");
      let id = 0 ;
      this.sub = this._activatedRoute.params.subscribe(params => {
          id = +params["id"]
      });

      console.log("Id is: ", id);

      this._customerService.getCustomer(id)
            .subscribe(d => {
                this.customer = d;
                this.mode = "success";
                console.log(d);
            },
            d => {
                this.mode = "error";
                console.log(d);
            });
  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }

  cancel() {
      console.log(this.customer.noAddress);
  }

  toggleNoAddress() {
    console.log("Checkbox change detected!");
    this.customer.noAddress = !this.customer.noAddress;
    console.log(this.customer.noAddress)
  }

}
