import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class ReportGiftCardHelperService {

    dailySum_normalizeData(data: any[]): any[] 
    {
        let index = -1;
        while (index < data.length - 1) {
            index++;
            if (index + 1 >= data.length)
                break;
            let date = data[index].Date;
            let date2 = data[index + 1].Date;
            
            if (this.isDateGap(date, date2)) {
                data = this.fillTheGap(data, date, date2, index);
            }
        }
        return data;
    }

    private fillTheGap(data: any[], date1: string, date2: string, startIndex: number): any[]
    {
        let d1 = moment(date1).format('YYYY-MM-DD');
        let d2 = moment(date2).format('YYYY-MM-DD');
        let d3 = moment(date1).add(1, 'days').format('YYYY-MM-DD');
        while (d3 !== d2) {
            data.splice(++startIndex, 0, {
                Date: d3,
                Purchase_revenue: 0,
                Purchase_number: 0,
                Coupon_revenue: 0,
                Coupon_number: 0,
                TotalRevenue: 0,
                TotalNumber: 0
            });
            d3 = moment(d3).add(1, 'days').format('YYYY-MM-DD');
        }
        return data;
    }

    private isDateGap(date1: string, date2: string) 
    {
        let d1 = moment(date1);
        let d2 = moment(date2);
        return Math.abs(d1.diff(d2, 'days')) > 1 ? true : false
    }

    dailySum_addTotals(data: any[]): any[]
    {
        data.forEach(e => {
            if (e.Date.length > 10) e.Date = e.Date.substr(0, 10);
            e.TotalRevenue = e.Purchase_revenue + e.Coupon_revenue;
            e.TotalNumber = e.Purchase_number + e.Coupon_number;
        });
        return data;
    }

    dailySum_addHead(data: any[], startDate): any[] 
    {
        startDate = moment(startDate).add(-1, 'days').format('YYYY-MM-DD');
        data = this.fillTheGap(data, startDate, data[0].Date, -1);
        return data;
    }

    dailySum_addTail(data: any[], endDate): any[] 
    {
        endDate = moment(endDate).add(1, 'days').format('YYYY-MM-DD');
        data = this.fillTheGap(data, data[data.length-1].Date, endDate, data.length);
        return data;
    }

}