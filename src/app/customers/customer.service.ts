import { Injectable } from '@angular/core';
import { ICustomer } from './icustomer';

@Injectable()
export class CustomerService {

  _customers:ICustomer[];
  
  constructor() { }

  getCustomers():ICustomer[] {
    let records:ICustomer[] = [{
                Id: 1,
                Name: "Behrooz Dalvandi Behrooz Dalvandi Behrooz Dalvandi",
                Phone: "2506403487",
                Address: "8183 Prince Edward Pl",
                City: "Prince George",
                Province: "BC",
                PostalCode: "V2N 3W8",
            },
            {
                Id: 2,
                Name: "Rahim Khajei",
                Phone: "2506403487",
                Address: "8183 Prince Edward Pl",
                City: "Prince George",
                Province: "BC",
                PostalCode: "V2N 3W8",
            },
            {
                Id: 3,
                Name: "Mani Samani",
                Phone: "2506403487",
                Address: "8183 Prince Edward Pl",
                City: "Prince George",
                Province: "BC",
                PostalCode: "V2N 3W8",
            },
            {
                Id: 4,
                Name: "Moji Malek",
                Phone: "2506403487",
                Address: "8183 Prince Edward Pl",
                City: "Prince George",
                Province: "BC",
                PostalCode: "V2N 3W8",
            },
            {
                Id: 5,
                Name: "Reza Akbari",
                Phone: "2506403487",
                Address: "8183 Prince Edward Pl",
                City: "Prince George",
                Province: "BC",
                PostalCode: "V2N 3W8",
            },
            {
                Id: 6,
                Name: "Nahid Taheri",
                Phone: "2506403487",
                Address: "8183 Prince Edward Pl",
                City: "Prince George",
                Province: "BC",
                PostalCode: "V2N 3W8",
            },
            {
                Id: 7,
                Name: "Mahnaz Sheikh",
                Phone: "2506403487",
                Address: "8183 Prince Edward Pl",
                City: "Prince George",
                Province: "BC",
                PostalCode: "V2N 3W8",
            },
            {
                Id: 8,
                Name: "Lindsay Logan",
                Phone: "2506403487",
                Address: "8183 Prince Edward Pl",
                City: "Prince George",
                Province: "BC",
                PostalCode: "V2N 3W8",
            },
            {
                Id: 9,
                Name: "Darcie Micheal",
                Phone: "2506403487",
                Address: "8183 Prince Edward Pl",
                City: "Prince George",
                Province: "BC",
                PostalCode: "V2N 3W8",
            },
            {
                Id: 10,
                Name: "Faramarz Kashanchi",
                Phone: "2506403487",
                Address: "8183 Prince Edward Pl",
                City: "Prince George",
                Province: "BC",
                PostalCode: "V2N 3W8",
            },
            {
                Id: 11,
                Name: "Mike Pence",
                Phone: "2506403487",
                Address: "8183 Prince Edward Pl",
                City: "Prince George",
                Province: "BC",
                PostalCode: "V2N 3W8",
            },
            {
                Id: 12,
                Name: "Hillary Clinton",
                Phone: "2506403487",
                Address: "8183 Prince Edward Pl",
                City: "Prince George",
                Province: "BC",
                PostalCode: "V2N 3W8",
            },
            {
                Id: 13,
                Name: "Bernie Sanders",
                Phone: "2506403487",
                Address: "8183 Prince Edward Pl",
                City: "Prince George",
                Province: "BC",
                PostalCode: "V2N 3W8",
            }];
        return records;
  }


}
