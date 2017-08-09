import { Component, OnInit } from '@angular/core';
import { Settings } from '../../../settings';

@Component({
  selector: 'app-report-reservation-index',
  templateUrl: './report-reservation-index.component.html',
  styleUrls: ['./report-reservation-index.component.css']
})
export class ReportReservationIndexComponent implements OnInit {

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
