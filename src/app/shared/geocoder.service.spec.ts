/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GeocoderService } from './geocoder.service';

describe('GeocoderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeocoderService]
    });
  });

  it('should ...', inject([GeocoderService], (service: GeocoderService) => {
    expect(service).toBeTruthy();
  }));
});
