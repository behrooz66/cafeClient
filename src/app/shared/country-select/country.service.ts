import { Injectable } from '@angular/core';

@Injectable()
export class CountryService {

  countries = [];
  constructor() {
      this.countries = [
          {
              Id: 1, 
              Name: 'Canada'
          },
          {
              Id: 2, 
              Name: 'United States'
          }
      ] ;
  }

  getCountries() {
      return this.countries;
  }

}
