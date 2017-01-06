import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderAddComponent } from './order-add/order-add.component';
import { OrderEditComponent } from './order-edit/order-edit.component';

import { OrderService } from './order.service';


@NgModule({
  imports: [
      CommonModule
  ],
  declarations: [
      OrdersListComponent, 
      OrderDetailsComponent,
      OrderAddComponent, 
      OrderEditComponent
  ],
  providers: [
      OrderService
  ],
  exports: [
      OrdersListComponent, 
      OrderDetailsComponent,
      OrderAddComponent, 
      OrderEditComponent
  ]
})
export class OrdersModule { }
