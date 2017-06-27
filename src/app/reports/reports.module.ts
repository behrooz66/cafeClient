import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReportIndexComponent } from './report-index/report-index.component';
import { ReportOrderMonthlySumComponent } from './order/report-order-monthly-sum/report-order-monthly-sum.component';
import { ReportOrderTopCustomersComponent } from './order/report-order-top-customers/report-order-top-customers.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    ReportIndexComponent,   
    ReportOrderMonthlySumComponent, ReportOrderTopCustomersComponent
  ],
  exports: [
    ReportIndexComponent
  ]
})
export class ReportsModule { }
