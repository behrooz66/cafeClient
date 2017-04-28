import { Injectable } from '@angular/core';

@Injectable()
export class PagerService {

  constructor() { }

   public totalPages(totalItems: number, pageSize: number): number {
        return Math.ceil(totalItems / pageSize); 
   }

   public startIndex(pageSize: number, pageIndex: number): number {
        return pageIndex * pageSize;
   }

   public endIndex(totalItems: number, pageSize: number, pageIndex: number) {
       let temp = (pageIndex * pageSize) + pageSize;
       let endIndex = temp > totalItems ? totalItems  : temp;
       return endIndex;
   }
}
