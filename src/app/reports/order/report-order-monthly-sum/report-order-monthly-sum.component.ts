import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../../report.service';
import { FlashMessageService } from '../../../shared/flash-message/flash-message.service';
import { Settings } from '../../../settings';
import { Chart } from 'chart.js';
import { ChartService } from '../../../shared/chart.service';
import { ReportOrderHelperService } from '../report-order-helper.service';

@Component({
  selector: 'report-order-monthly-sum',
  templateUrl: './report-order-monthly-sum.component.html',
  styleUrls: ['./report-order-monthly-sum.component.css'],
  providers: [ 
      ReportService,
      ChartService,
      ReportOrderHelperService
  ]
})

export class ReportOrderMonthlySumComponent implements OnInit {

  data;
  startDate: string = "";
  endDate: string = "";

  mode: string;
  empty: boolean = false;

  @ViewChild('revenueBar') revenueBar;
  @ViewChild('quantityBar') quantityBar;
  @ViewChild('revenuePie') revenuePie;
  @ViewChild('quantityPie') quantityPie;

  // chart objects
  chartQuantityBar: Chart;
  chartRevenueBar: Chart;
  chartQuantityPie: Chart;
  chartRevenuePie: Chart;


  constructor(private _report: ReportService,
              private _flash: FlashMessageService,
              private _chart: ChartService,
              private _helper: ReportOrderHelperService) { }

  ngOnInit() {

  }


  refresh() 
  {
      this.mode = "loading";
      this.empty = false;
      this._report.getOrdersMonthlySum(this.startDate+"-10",this.endDate+"-10" , null)
            .subscribe(
                d => {
                    if (!this.noResult(d))
                    {
                        this.data = d;
                        this.revenueBarChart();
                        this.quantityBarChart();
                        this.revenuePieChart();
                        this.quantityPieChart();
                    }
                    else 
                    {
                        this.empty = true;
                    }
                    this.mode = "success";
                },
                d => {
                    this.mode = "error";
                    this._flash.addMessage("Error", "Error in generating report.", true, "danger", 3000, 2);
                }
            );
  }


  revenueBarChart(){
      let result = this._helper.monthlySum_prepareDataForRevenueBarChart(this.data);
      let options = {
            title: {
                display: false,
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
            },
            legend:
            {
                position: 'bottom'
            }
        }
      if (this.chartRevenueBar)
          this.chartRevenueBar.destroy();
      this.chartRevenueBar = this._chart.BarChart(this.revenueBar, result.labels, result.datasets, options);
      this.chartRevenueBar.render();
  }


  quantityBarChart(){
      let result = this._helper.monthlySum_prepareDataForQuantityBarChart(this.data);
      let options = {
            title: {
                display: false,
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
            },
            legend:
            {
                position: 'bottom'
            }
        };
      if (this.chartQuantityBar)
          this.chartQuantityBar.destroy();
      this.chartQuantityBar = this._chart.BarChart(this.quantityBar, result.labels, result.datasets, options);
      this.chartQuantityBar.render();
  }


  revenuePieChart() {
      let result = this._helper.monthlySum_prepareDataForRevenuePieChart(this.data);
      let options = {
            title: {
                display: false,
                text: 'Revenue Ratios by Order Type',
                fontSize: 14
            },
            legend:
            {
                position: 'bottom'
            }
        };
      if (this.chartRevenuePie)
          this.chartRevenuePie.destroy();
      this.chartRevenuePie = this._chart.DoughnutChart(this.revenuePie, result.labels, result.datasets, options);
      this.chartRevenuePie.render();
  }

  quantityPieChart() {
      let result = this._helper.monthlySum_prepareDataForQuantityPieChart(this.data);
      let options = {
              title: {
                  display: false,
                  text: 'Number of Orders Ratios by Order Type',
                  fontSize: 14
              },
              legend:
                {
                    position: 'bottom'
                }
          };
      if (this.chartQuantityPie)
          this.chartQuantityPie.destroy();
      this.chartQuantityPie = this._chart.DoughnutChart(this.quantityPie, result.labels, result.datasets, options);
      this.chartQuantityPie.render();
  }

  private getRevenueData(type: string, index: number): number 
  {
      return this.data[index].Types.filter(d => d.Type === type)[0].Revenue;
  }

  private getQuantityData(type: string, index: number): number 
  {
      return this.data[index].Types.filter(d => d.Type === type)[0].Count;
  }

  private noResult(d: any[]): boolean
  {
      let x = true;
      d.forEach(e => {
          if (e.TotalOrders !== 0)
            x = false;
      });
      return x;
  }
  
  

}
