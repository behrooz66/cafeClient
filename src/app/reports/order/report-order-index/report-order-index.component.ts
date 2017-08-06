import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'report-order-index',
  templateUrl: './report-order-index.component.html',
  styleUrls: ['./report-order-index.component.css']
})
export class ReportOrderIndexComponent implements OnInit {

  viewMode: string = "dailySum"; //monthlySum, recordsMap, topCustomers
  
  constructor() { }

  ngOnInit() {
  }

}
