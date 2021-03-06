import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReportIndexComponent } from './report-index/report-index.component';
import { ReportOrderMonthlySumComponent } from './order/report-order-monthly-sum/report-order-monthly-sum.component';
import { ReportOrderTopCustomersComponent } from './order/report-order-top-customers/report-order-top-customers.component';
import { ReportOrderDailySumComponent } from './order/report-order-daily-sum/report-order-daily-sum.component';
import { ReportOrderRecordsMapComponent } from './order/report-order-records-map/report-order-records-map.component';
import { ReportReservationDailySumComponent } from './reservation/report-reservation-daily-sum/report-reservation-daily-sum.component';
import { ReportReservationMonthlySumComponent } from './reservation/report-reservation-monthly-sum/report-reservation-monthly-sum.component';
import { ReportReservationTopCustomersComponent } from './reservation/report-reservation-top-customers/report-reservation-top-customers.component';
import { ReportReservationRecordsMapComponent } from './reservation/report-reservation-records-map/report-reservation-records-map.component';
import { ReportGiftcardDailySumComponent } from './giftcard/report-giftcard-daily-sum/report-giftcard-daily-sum.component';
import { ReportGiftcardMonthlySumComponent } from './giftcard/report-giftcard-monthly-sum/report-giftcard-monthly-sum.component';
import { ReportGiftcardRecordsMapComponent } from './giftcard/report-giftcard-records-map/report-giftcard-records-map.component';
import { ReportGiftcardTopCustomersComponent } from './giftcard/report-giftcard-top-customers/report-giftcard-top-customers.component';
import { ReportOrderIndexComponent } from './order/report-order-index/report-order-index.component';
import { ReportGiftcardIndexComponent } from './giftcard/report-giftcard-index/report-giftcard-index.component';
import { ReportReservationIndexComponent } from './reservation/report-reservation-index/report-reservation-index.component';

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
    ReportOrderMonthlySumComponent, 
    ReportOrderTopCustomersComponent, 
    ReportOrderDailySumComponent,
    ReportOrderRecordsMapComponent,
    ReportReservationDailySumComponent,
    ReportReservationMonthlySumComponent,
    ReportReservationTopCustomersComponent,
    ReportReservationRecordsMapComponent,
    ReportGiftcardDailySumComponent,
    ReportGiftcardMonthlySumComponent,
    ReportGiftcardRecordsMapComponent,
    ReportGiftcardTopCustomersComponent,
    ReportOrderIndexComponent,
    ReportGiftcardIndexComponent,
    ReportReservationIndexComponent
  ],
  exports: [
    ReportIndexComponent
  ]
})
export class ReportsModule { }
