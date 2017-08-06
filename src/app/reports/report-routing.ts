import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportIndexComponent } from './report-index/report-index.component';
import { ReportOrderIndexComponent } from './order/report-order-index/report-order-index.component';
import { ReportOrderDailySumComponent } from './order/report-order-daily-sum/report-order-daily-sum.component';
import { ReportOrderMonthlySumComponent } from './order/report-order-monthly-sum/report-order-monthly-sum.component';
import { ReportOrderRecordsMapComponent } from './order/report-order-records-map/report-order-records-map.component';
import { ReportOrderTopCustomersComponent } from './order/report-order-top-customers/report-order-top-customers.component';

const routes: Routes = [
    {
        path: 'reports',
        component: ReportIndexComponent
    },
    {
        path: 'reports/orders',
        component: ReportOrderIndexComponent
    }
]

export const ReportRouting = RouterModule.forChild(routes);