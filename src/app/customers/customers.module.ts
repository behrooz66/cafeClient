import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersFilterComponent } from './customers-list/customers-filter.component';

import {SharedModule} from '../shared/shared.module';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    CustomersListComponent,
    CustomersFilterComponent,
    CustomerDetailsComponent
  ],
  exports: [
    CustomersListComponent
  ]
})
export class CustomersModule { }
