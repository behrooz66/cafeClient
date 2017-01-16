import { Injectable } from '@angular/core';

@Injectable()
export class CityService {
  cities;
  constructor() {
    this.cities = [{
          Id:1,
          Name: 'Prince George',
          ProvinceId:1
      },
      {
          Id: 2,
          Name: 'Vancouver',
          ProvinceId: 1
      },
      {
          Id: 3,
          Name: 'Calgary',
          ProvinceId: 2
      },
      {
          Id: 4,
          Name: 'Edmonton',
          ProvinceId: 2
      }];
  }

  getCities(){
    return this.cities;
  }

}
