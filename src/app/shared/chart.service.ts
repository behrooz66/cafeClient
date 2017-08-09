import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';

@Injectable()
export class ChartService 
{

    lineChart(canvas, labels: any[], datasets: any[], chartOptions: any ): Chart
    {
        let chart  = new Chart(canvas.nativeElement.getContext('2d'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets,
            },
            options: chartOptions
        });
        return chart;
    }

    BarChart(canvas, labels: any[], datasets: any[], chartOptions: any): Chart
    {
        let chart = new Chart(canvas.nativeElement.getContext('2d'), {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: chartOptions
        });
        return chart;
    }

    DoughnutChart(canvas, labels: any[], datasets: any[], options: DoughnutChartOptions): Chart
    {
        let chart = new Chart(canvas.nativeElement.getContext('2d'), {
            type: 'doughnut',
            data: {
                datasets: datasets,
                labels: labels
            },
            options: options
        });
        return chart;
    }
}

export class LineChartDataset
{
    public label: string;
    public data: any[];
    public backgroundColor: string;
    public borderColor: string;
    public borderDash: [number, number] = [1 , 0]
}

export class BarChartDataset 
{
    public label: string;
    public data: any[];
    backgroundColor: string
}

export class DoughnutChartDataset 
{
    public data: number [];
    backgroundColor: string[];
}

export class DoughnutChartOptions 
{
    title: {
        display: boolean,
        text: string,
        fontSize: number
    }    
}

export class LineChartOptions
{
    title: {
        display: boolean,
        text: string,
        fontSize: number
    };

    scales: {
        yAxes: [
            {
                ticks: {
                    min: number,
                    callback: ((value, index, values) => any)
                }
            }
        ]
    }

    legend: {
        display: boolean,
        position: string
    }
}

export class BarChartOptions
{
    title: {
        display: boolean,
        text: string,
        fontSize: number
    };

    scales: {
        yAxes: [
            {
                ticks: {
                    min: number,
                    callback: ((value, index, values) => any)
                }
            }
        ]
    }
}
