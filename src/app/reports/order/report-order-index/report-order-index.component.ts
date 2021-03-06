import { Component, OnInit } from '@angular/core';
import { Settings } from '../../../settings';

@Component({
  selector: 'report-order-index',
  templateUrl: './report-order-index.component.html',
  styleUrls: ['./report-order-index.component.css']
})
export class ReportOrderIndexComponent implements OnInit {

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
