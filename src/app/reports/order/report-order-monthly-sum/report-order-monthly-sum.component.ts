import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../report.service';

@Component({
  selector: 'report-order-monthly-sum',
  templateUrl: './report-order-monthly-sum.component.html',
  styleUrls: ['./report-order-monthly-sum.component.css'],
  providers: [ ReportService ]
})

export class ReportOrderMonthlySumComponent implements OnInit {

  x;
  constructor(private _report: ReportService) { }

  ngOnInit() {
      this._report.getOrdersMonthlySum('2017-05-13', null, null)
            .subscribe(
                d => {
                    this.x = d;
                },
                d => {
                    console.log(d);
                }
            );
  }

  

}
