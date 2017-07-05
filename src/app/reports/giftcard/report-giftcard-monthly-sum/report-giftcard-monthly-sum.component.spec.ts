import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGiftcardMonthlySumComponent } from './report-giftcard-monthly-sum.component';

describe('ReportGiftcardMonthlySumComponent', () => {
  let component: ReportGiftcardMonthlySumComponent;
  let fixture: ComponentFixture<ReportGiftcardMonthlySumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportGiftcardMonthlySumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportGiftcardMonthlySumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
