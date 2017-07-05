import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGiftcardTopCustomersComponent } from './report-giftcard-top-customers.component';

describe('ReportGiftcardTopCustomersComponent', () => {
  let component: ReportGiftcardTopCustomersComponent;
  let fixture: ComponentFixture<ReportGiftcardTopCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportGiftcardTopCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportGiftcardTopCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
