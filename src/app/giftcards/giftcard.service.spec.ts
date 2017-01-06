/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GiftCardService } from './giftcard.service';

describe('GiftCardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GiftCardService]
    });
  });

  it('should ...', inject([GiftCardService], (service: GiftCardService) => {
    expect(service).toBeTruthy();
  }));
});
