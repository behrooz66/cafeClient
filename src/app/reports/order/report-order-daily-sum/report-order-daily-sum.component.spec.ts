import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOrderDailySumComponent } from './report-order-daily-sum.component';

describe('ReportOrderDailySumComponent', () => {
  let component: ReportOrderDailySumComponent;
  let fixture: ComponentFixture<ReportOrderDailySumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportOrderDailySumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOrderDailySumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
