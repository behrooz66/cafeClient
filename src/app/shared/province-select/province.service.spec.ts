/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProvinceService } from './province.service';

describe('ProvinceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProvinceService]
    });
  });

  it('should ...', inject([ProvinceService], (service: ProvinceService) => {
    expect(service).toBeTruthy();
  }));
});
