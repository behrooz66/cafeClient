import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportReservationDailySumComponent } from './report-reservation-daily-sum.component';

describe('ReportReservationDailySumComponent', () => {
  let component: ReportReservationDailySumComponent;
  let fixture: ComponentFixture<ReportReservationDailySumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportReservationDailySumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportReservationDailySumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
