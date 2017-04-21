import { TestBed, inject } from '@angular/core/testing';

import { GiftcardTypeService } from './giftcard-type.service';

describe('GiftcardTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GiftcardTypeService]
    });
  });

  it('should ...', inject([GiftcardTypeService], (service: GiftcardTypeService) => {
    expect(service).toBeTruthy();
  }));
});
