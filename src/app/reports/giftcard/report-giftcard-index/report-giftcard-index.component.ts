import { Component, OnInit } from '@angular/core';
import { Settings } from '../../../settings';

@Component({
  selector: 'app-report-giftcard-index',
  templateUrl: './report-giftcard-index.component.html',
  styleUrls: ['./report-giftcard-index.component.css']
})
export class ReportGiftcardIndexComponent implements OnInit {

    viewMode: string; //dailySum, monthlySum, recordsMap, topCustomers
    constructor() { }

    ngOnInit() 
    {
        this.viewMode = Settings.reports.orders.viewMode;
    }

    setViewMode(mode: string)
    {
        this.viewMode = mode;
        Settings.reports.orders.viewMode = mode;
    }

}
