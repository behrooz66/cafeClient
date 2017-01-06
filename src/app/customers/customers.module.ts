import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersFilterComponent } from './customers-list/customers-filter.component';

import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    CustomersListComponent,
    CustomersFilterComponent
  ],
  exports: [
    CustomersListComponent
  ]
})
export class CustomersModule { }
