import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGiftcardDailySumComponent } from './report-giftcard-daily-sum.component';

describe('ReportGiftcardDailySumComponent', () => {
  let component: ReportGiftcardDailySumComponent;
  let fixture: ComponentFixture<ReportGiftcardDailySumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportGiftcardDailySumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportGiftcardDailySumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
