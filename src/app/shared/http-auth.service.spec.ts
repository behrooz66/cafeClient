/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpAuthService } from './http-auth.service';

describe('HttpAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpAuthService]
    });
  });

  it('should ...', inject([HttpAuthService], (service: HttpAuthService) => {
    expect(service).toBeTruthy();
  }));
});
