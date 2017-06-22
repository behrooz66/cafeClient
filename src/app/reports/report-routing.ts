import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportIndexComponent } from './report-index/report-index.component';

const routes: Routes = [
    {
        path: 'reports',
        component: ReportIndexComponent
    }
]

export const ReportRouting = RouterModule.forChild(routes);