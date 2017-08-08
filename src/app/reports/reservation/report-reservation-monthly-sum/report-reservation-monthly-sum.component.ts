import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../../report.service';
import { FlashMessageService } from '../../../shared/flash-message/flash-message.service';
import { Settings } from '../../../settings';
import { ChartService, BarChartDataset, BarChartOptions, 
         DoughnutChartDataset, DoughnutChartOptions} from '../../../shared/chart.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'report-reservation-monthly-sum',
  templateUrl: './report-reservation-monthly-sum.component.html',
  styleUrls: ['./report-reservation-monthly-sum.component.css'],
  providers: [
      ReportService,
      ChartService
  ]
})
export class ReportReservationMonthlySumComponent implements OnInit {

  data;
  startDate: string = "";
  endDate: string = "";

  mode: string;

  @ViewChild('revenueBar') revenueBar;
  @ViewChild('quantityBar') quantityBar;
  @ViewChild('revenuePie') revenuePie;
  @ViewChild('quantityPie') quantityPie;

  constructor(private _report: ReportService,
              private _flash: FlashMessageService,
              private _chart: ChartService) { }



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
      let months: string[] = [];
      let statuses: string[] = [];
      let datasets: any[] = [];
      
      this.data.forEach(element => {
          months.push(element.Month);
      });

      this.data[0].Statuses.forEach(e => {
          statuses.push(e.Status);
      });
      
      let colorIndex = 0;
      statuses.forEach(status => {
          let ds = {
              label: status,
              data: [],
              backgroundColor: Settings.reports.chartColors[colorIndex++]
          };
          
          for (let i=0; i<this.data.length; i++){
              ds.data.push(this.getRevenueData(status, i));
          }
          datasets.push(ds);
      });

      statuses.push("Total");

      datasets.push({
          label: "Total",
          data: [],
          backgroundColor: Settings.reports.chartColors[5]
      });

      this.data.forEach(el => {
          datasets[datasets.length-1].data.push(el.TotalRevenue);
      });

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
      

      let chart = this._chart.BarChart(this.revenueBar, months, datasets, options);
      chart.render();
  }

  
  quantityBarChart()
  {
      let months: string[] = [];
      let statuses: string[] = [];
      let datasets: any[] = [];
      
      this.data.forEach(element => {
          months.push(element.Month);
      });

      this.data[0].Statuses.forEach(e => {
          statuses.push(e.Status);
      });
      
      let colorIndex = 0;
      statuses.forEach(status => {
          let ds = {
              label: status,
              data: [],
              backgroundColor: Settings.reports.chartColors[colorIndex++]
          };
          
          for (let i=0; i<this.data.length; i++){
              ds.data.push(this.getQuantityData(status, i));
          }
          datasets.push(ds);
      });

      statuses.push("Total");

      datasets.push({
          label: "Total",
          data: [],
          backgroundColor: Settings.reports.chartColors[5]
      });

      this.data.forEach(el => {
          console.log(el);
          datasets[datasets.length-1].data.push(el.TotalReservations);
      });

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

      let chart = this._chart.BarChart(this.quantityBar, months, datasets, options);
      chart.render();
  }

  quantityPieChart() 
  {
      let statuses: string[] = [];
      let datasets: any[] = [];
      let sums: number[] = [];

      this.data[0].Statuses.forEach(e => {
          statuses.push(e.Status);
      });

      for (let t=0; t<statuses.length; t++){
          sums[t] = 0;
          for (let i=0; i<this.data.length; i++){
              sums[t] += this.getQuantityData(statuses[t], i);
          }
      }

      let ds = {
          data: sums,
          backgroundColor: [
                Settings.reports.chartColors[0],
                Settings.reports.chartColors[1],
                Settings.reports.chartColors[2],
            ]
      };

      let dss: DoughnutChartDataset[] = [
          {
              data: sums,
              backgroundColor: [
                  Settings.reports.chartColors[0],
                  Settings.reports.chartColors[1],
                  Settings.reports.chartColors[2],
              ]
          }
      ]
    
      let options = new DoughnutChartOptions();
      options.title = {
          display: true,
          text: 'Reservation Status Ratios',
          fontSize: 14
      };

      let chart = this._chart.DoughnutChart(this.quantityPie, statuses, dss, options);
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
