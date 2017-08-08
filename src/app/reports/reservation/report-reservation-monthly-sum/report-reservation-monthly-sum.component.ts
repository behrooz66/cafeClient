import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../../report.service';
import { FlashMessageService } from '../../../shared/flash-message/flash-message.service';
import { Settings } from '../../../settings';
import { ReportReservationHelperService } from '../report-reservation-helper.service';
import { ChartService, BarChartDataset, BarChartOptions, 
         DoughnutChartDataset, DoughnutChartOptions} from '../../../shared/chart.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'report-reservation-monthly-sum',
  templateUrl: './report-reservation-monthly-sum.component.html',
  styleUrls: ['./report-reservation-monthly-sum.component.css'],
  providers: [
      ReportService,
      ChartService,
      ReportReservationHelperService
  ]
})
export class ReportReservationMonthlySumComponent implements OnInit {

  data;
  startDate: string = "";
  endDate: string = "";

  mode: string;

  @ViewChild('revenueBar') revenueBar;
  @ViewChild('quantityBar') quantityBar;
  //@ViewChild('revenuePie') revenuePie;
  @ViewChild('quantityPie') quantityPie;

  constructor(private _report: ReportService,
              private _flash: FlashMessageService,
              private _chart: ChartService,
              private _helper: ReportReservationHelperService) { }

  ngOnInit() 
  {

  }

  refresh() 
  {
      this.mode = "loading";
      this._report.getReservationsMonthlySum(this.startDate+"-10",this.endDate+"-10" , null)
            .subscribe(
                d => {
                    this.data = d;
                    this.revenueBarChart();
                    this.quantityBarChart();
                    this.quantityPieChart();
                    this.mode = "success";
                },
                d => {
                    this._flash.addMessage("Error", "Error in generating report.", true, "danger", 3000, 2);
                    this.mode = "error";
                }
            );
  }

  revenueBarChart() 
  {
      let result = this._helper.monthlySum_prepareDataForRevenueBarChart(this.data);
      let options = new BarChartOptions();
      options.title = {
                  display: true,
                  text: 'Recorded Revenue by Month',
                  fontSize: 16
              };
      options.scales = {
                  yAxes:[
                      {
                          ticks: {
                              min: 0,
                              callback: (value, index, values) => '$' + value
                          }
                      }
                  ]
              };
      

      let chart = this._chart.BarChart(this.revenueBar, result.labels, result.datasets, options);
      chart.render();
  }

  
  quantityBarChart()
  {
      let result = this._helper.monthlySum_prepareDataForQuantityBarChart(this.data);
      let options = new BarChartOptions();
      options = {
          title: {
                  display: true,
                  text: 'Number of Reservations by Month',
                  fontSize: 16
              },
              scales:{
                  yAxes:[
                      { 
                          ticks: {
                              min: 0,
                              callback: function(value, index, values) {
                                  if (Math.floor(value) === value) {
                                      return value;
                                  }
                              }
                          }
                      }
                  ]
              }
      };
      let chart = this._chart.BarChart(this.quantityBar, result.labels, result.datasets, options);
      chart.render();
  }

  quantityPieChart() 
  {
      let result = this._helper.monthlySum_prepareDataForQuantityPieChart(this.data);
    
      let options = new DoughnutChartOptions();
      options.title = {
          display: true,
          text: 'Reservation Status Ratios',
          fontSize: 14
      };

      let chart = this._chart.DoughnutChart(this.quantityPie, result.labels, result.datasets, options);
      chart.render();
  }


  private getRevenueData(status: string, index: number): number 
  {
      return this.data[index].Statuses.filter(d => d.Status === status)[0].Revenue;
  }

  private getQuantityData(status: string, index: number): number 
  {
      return this.data[index].Statuses.filter(d => d.Status === status)[0].Count;
  }

}
