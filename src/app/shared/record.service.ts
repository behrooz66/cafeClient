import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class RecordService {

    pageInfo: {
        pageSize: number;
        index: number;
    }

    filtersInfo: any[];
    /*
        filterInfo: [
            { type: "text", field: "name", *typeSpecificOptions... },
            { type: "text", field: "category", *typeSpecificOptions... },
        ]
    // text: param
    // list: option
    // date: from, to
    // number: from, to
    // bool: status
    */

    sortInfo: any[];
    /*
        currently, there is single sorting: {
            field: "a", order: "desc"
        }
        
        but hopefully there will be multiple:
        sortInfo: [
            { field: "a", order: "asc"},
            { field: "b", order: "desc"},
            ...
        ]
    */


    getPageItems(dataset: any[], filtersInfo, sortInfo, pageInfo){

        // 1. Apply filters
        if (filtersInfo !== null)
            dataset = this.doFilters(dataset, filtersInfo);
        
        // 2. Apply Sorts
        if (sortInfo !== null)
            dataset = this.doSorting(dataset, sortInfo);

        // 3. Apply Paging
        let p = this.doPaging(dataset, pageInfo);
        dataset = p.data;
        
        return {
            data: dataset,
            numberOfPages: p.numberOfPages
        }
    }

    doPaging(dataset: any[], pageInfo) 
    {
        let totalPages = this.totalPages(dataset.length, pageInfo.pageSize);
        let si = this.startIndex(pageInfo.pageSize, pageInfo.index);
        let ei = this.endIndex(dataset.length, pageInfo.pageSize, pageInfo.index);
        dataset = dataset.slice(si, ei);
        return {
            data: dataset,
            numberOfPages: totalPages
        }
    }

    doSorting(dataset: any[], sortInfo) 
    {
        dataset = this.sort(dataset, sortInfo.field, sortInfo.order);
        return dataset;
    }

    doFilters(dataset: any[], filtersInfo)
    {
        let sub = dataset;
        filtersInfo.forEach(filter => {
            if (filter.type === "text"){
                sub = this.filterText(sub, filter.field, filter.param);
            }
            else if (filter.type === "date"){
                sub = this.FilterDate(sub, filter.field, filter.from, filter.to);
            }
            else if (filter.type === "number"){
                sub = this.FilterNumber(sub, filter.field, filter.from, filter.to);
            }
            else if (filter.type === "list"){
                sub = this.FilterList(sub, filter.field, filter.selected);
            }
            else if (filter.type === "boolean") {
                sub = this.FilterBool(sub, filter.field, filter.status);
            }
        });
        return sub;
    }



//************************************************************************************************** */

//FILTERING WORK
    // text: param
    // list: option
    // date: from, to
    // number: from, to

  private filterText(dataset: any[], field:string, param: string): any[] {
        if (param) {
            dataset = dataset.filter(
                x => x[field].toLowerCase().indexOf(param.toLowerCase()) !== -1
            );
        }
        return dataset;
  }

  private FilterList(dataset: any[], field: string, option: string){
        let f = field.split(".");
        if (option){
            dataset = dataset.filter(
                x => this.extract(x, f).toLowerCase() === option.toLowerCase()
            );
        }
        return dataset;
        //if (dataset.length === 0) alert("empty!");
  }

  private extract(a: any, fields:string[])
  {
        for (let i=0; i < fields.length; i++) {
            a = a[fields[i]];
        }
        return a;
  }

  private FilterDate(dataset: any[], field: string, from: string, to: string){
        if (from) {
            dataset = dataset.filter(
                x => moment(x[field]).isSameOrAfter(moment(from))
            );
        }
        if (to) {
            dataset = dataset.filter(
                x => moment(x[field]).isSameOrBefore(moment(to))
            );
        }
        return dataset;
  }

  private FilterNumber(dataset: any[], field: string, from: number, to: number){
       if (from) {
           dataset = dataset.filter(
               x => x[field] >= from
           );
       }
       if (to) {
           dataset = dataset.filter(
               x => x[field] <= to
           );
       }
       return dataset;
  }

  private FilterBool(dataset: any[], field: string, status: boolean) 
  {
    //   if (status) 
    //   {
    //       dataset = dataset.filter(
    //           x => x[field] === true
    //       );
    //   }
    //   if (!status) 
    //   {
    //       dataset = dataset.filter(
    //           x => x[field] === false
    //       )
    //   }
      if (!status) {
          dataset = dataset.filter(
              x => x[field] === false
          );
      }
      return dataset;
  }

//SORTING WORK
   private sort(dataset:any[], field: string, order: string): any[] {
        if (order === "desc"){
            dataset = dataset.sort(function(a, b) {
                if (a[field] > b[field])
                    return -1;
                else if (a[field] < b[field])
                    return 1;
            });
        }
        else {
            dataset = dataset.sort(function(a, b) {
                if (a[field] > b[field])
                    return 1;
                else if (a[field] < b[field])
                    return -1;
            });
        }
        return dataset;
   }

// PAGING WORK
   private totalPages(totalItems: number, pageSize: number): number {
        return Math.ceil(totalItems / pageSize); 
   }

   private startIndex(pageSize: number, pageIndex: number): number {
        return pageIndex * pageSize;
   }

   private endIndex(totalItems: number, pageSize: number, pageIndex: number) {
       let temp = (pageIndex * pageSize) + pageSize;
       let endIndex = temp > totalItems ? totalItems  : temp;
       return endIndex;
   }
}