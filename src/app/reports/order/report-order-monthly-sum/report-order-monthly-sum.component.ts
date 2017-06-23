import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../../report.service';
import { FlashMessageService } from '../../../shared/flash-message/flash-message.service';
import { Settings } from '../../../settings';
import { Chart } from 'chart.js';

@Component({
  selector: 'report-order-monthly-sum',
  templateUrl: './report-order-monthly-sum.component.html',
  styleUrls: ['./report-order-monthly-sum.component.css'],
  providers: [ ReportService ]
})

export class ReportOrderMonthlySumComponent implements OnInit {

  data;
  startDate: string = "";
  endDate: string = "";
  @ViewChild('revenueBar') revenueBar;
  @ViewChild('quantityBar') quantityBar;
  @ViewChild('revenuePie') revenuePie;
  @ViewChild('quantityPie') quantityPie;

  constructor(private _report: ReportService,
              private _flash: FlashMessageService) { }

  ngOnInit() {
    //   this._report.getOrdersMonthlySum(null, null, null)
    //         .subscribe(
    //             d => {
    //                 this.data = d;
    //                 this.revenueBarChart();
    //                 this.quantityBarChart();
    //                 this.revenuePieChart();
    //                 this.quantityPieChart();
    //             },
    //             d => {
                    
    //             }
    //         );
      
  }


  refresh() 
  {
      alert(":D");
      console.log(this.startDate+"-10");
      this._report.getOrdersMonthlySum(this.startDate+"-10",this.endDate+"-10" , null)
            .subscribe(
                d => {
                    console.log("D: ", d);
                    this.data = d;
                    this.revenueBarChart();
                    this.quantityBarChart();
                    this.revenuePieChart();
                    this.quantityPieChart();
                },
                d => {
                    console.log("error");
                    this._flash.addMessage("Error", "Error in generating report.", true, "danger", 3000, 2);
                }
            );
  }


  revenueBarChart(){
      let months: string[] = [];
      let types: string[] = [];
      let datasets: any[] = [];
      
      this.data.forEach(element => {
          months.push(element.Month);
      });

      this.data[0].Types.forEach(e => {
          types.push(e.Type);
      });
      
      let colorIndex = 0;
      types.forEach(type => {
          let ds = {
              label: type,
              data: [],
              backgroundColor: Settings.reports.chartColors[colorIndex++]
          };
          
          for (let i=0; i<this.data.length; i++){
              ds.data.push(this.getRevenueData(type, i));
          }
          datasets.push(ds);
      });

      types.push("Total");

      datasets.push({
          label: "Total",
          data: [],
          backgroundColor: Settings.reports.chartColors[5]
      });

      this.data.forEach(el => {
          datasets[datasets.length-1].data.push(el.TotalRevenue);
      });

      let chart = new Chart(this.revenueBar.nativeElement.getContext('2d'), {
          type: 'bar',
          data: {
              labels: months,
              datasets: datasets
          },
          options:{
              title: {
                  display: true,
                  text: 'Revenue by Month',
                  fontSize: 16
              },
              scales:{
                  yAxes:[
                      {
                          ticks: {
                              min: 0,
                              callback: (value, index, values) => '$' + value
                          }
                      }
                  ]
              }
          }
      });

      chart.render();
  }


  quantityBarChart(){
      let months: string[] = [];
      let types: string[] = [];
      let datasets: any[] = [];
      
      this.data.forEach(element => {
          months.push(element.Month);
      });

      this.data[0].Types.forEach(e => {
          types.push(e.Type);
      });
      
      let colorIndex = 0;
      types.forEach(type => {
          let ds = {
              label: type,
              data: [],
              backgroundColor: Settings.reports.chartColors[colorIndex++]
          };
          
          for (let i=0; i<this.data.length; i++){
              ds.data.push(this.getQuantityData(type, i));
          }
          datasets.push(ds);
      });

      types.push("Total");

      datasets.push({
          label: "Total",
          data: [],
          backgroundColor: Settings.reports.chartColors[5]
      });

      this.data.forEach(el => {
          datasets[datasets.length-1].data.push(el.TotalOrders);
      });

      let chart = new Chart(this.quantityBar.nativeElement.getContext('2d'), {
          type: 'bar',
          data: {
              labels: months,
              datasets: datasets
          },
          options:{
              title: {
                  display: true,
                  text: 'Number of Orders by Month',
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
          }
      });

      chart.render();
  }


  revenuePieChart() {
      let types: string[] = [];
      let datasets: any[] = [];
      let sums: number[] = [];

      this.data[0].Types.forEach(e => {
          types.push(e.Type);
      });

      for (let t=0; t<types.length; t++){
          sums[t] = 0;
          for (let i=0; i<this.data.length; i++){
              sums[t] += this.getRevenueData(types[t], i);
          }
          sums[t] = Math.round(sums[t] * 100) / 100;
      }
 
      let chart = new Chart(this.revenuePie.nativeElement.getContext('2d'), {
          type: 'doughnut',
          data: {
              datasets: [
                  {
                      data: sums,
                      backgroundColor: [
                          Settings.reports.chartColors[0],
                          Settings.reports.chartColors[1],
                          Settings.reports.chartColors[2],
                      ]
                  }
              ],
              labels: types
          },
          options: {
              title: {
                  display: true,
                  text: 'Revenue Ratios by Order Type',
                  fontSize: 14
              }
          }
      });
      chart.render();
  }

  quantityPieChart() {
      let types: string[] = [];
      let datasets: any[] = [];
      let sums: number[] = [];

      this.data[0].Types.forEach(e => {
          types.push(e.Type);
      });

      for (let t=0; t<types.length; t++){
          sums[t] = 0;
          for (let i=0; i<this.data.length; i++){
              sums[t] += this.getQuantityData(types[t], i);
          }
      }

      let chart = new Chart(this.quantityPie.nativeElement.getContext('2d'), {
          type: 'doughnut',
          data: {
              datasets: [
                  {
                      data: sums,
                      backgroundColor: [
                          Settings.reports.chartColors[0],
                          Settings.reports.chartColors[1],
                          Settings.reports.chartColors[2],
                      ]
                  }
              ],
              labels: types
          },
          options: {
              title: {
                  display: true,
                  text: 'Number of Orders Ratios by Order Type',
                  fontSize: 14
              }
          }
      });
      chart.render();
  }

  private getRevenueData(type: string, index: number): number 
  {
      return this.data[index].Types.filter(d => d.Type === type)[0].Revenue;
  }

  private getQuantityData(type: string, index: number): number 
  {
      return this.data[index].Types.filter(d => d.Type === type)[0].Count;
  }

  
  

}
