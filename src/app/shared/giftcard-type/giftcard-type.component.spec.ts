import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftcardTypeComponent } from './giftcard-type.component';

describe('GiftcardTypeComponent', () => {
  let component: GiftcardTypeComponent;
  let fixture: ComponentFixture<GiftcardTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftcardTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftcardTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
