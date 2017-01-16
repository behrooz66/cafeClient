import { Injectable } from '@angular/core';

@Injectable()
export class ProvinceService {

  provinces;
  constructor() {
      this.provinces = [
        {
            Id: 1,
            Name: 'British Columbia'
        },
        {
            Id: 2,
            Name: 'Alberta'
        }
      ];
  }

  getProvinces(){
      return this.provinces;
  }

}
