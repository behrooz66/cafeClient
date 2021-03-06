import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersFilterComponent } from './customers-list/customers-filter.component';

import {SharedModule} from '../shared/shared.module';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerHistoryComponent } from './customer-history/customer-history.component';

//import { HttpAuthService } from '../shared/http-auth.service';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    CustomersListComponent,
    CustomersFilterComponent,
    CustomerDetailsComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    CustomerHistoryComponent
  ],
  exports: [
    CustomersListComponent
  ],
  //providers: [HttpAuthService]
})
export class CustomersModule { }
