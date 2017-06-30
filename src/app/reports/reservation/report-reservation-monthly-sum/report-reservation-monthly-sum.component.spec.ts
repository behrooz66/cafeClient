import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportReservationMonthlySumComponent } from './report-reservation-monthly-sum.component';

describe('ReportReservationMonthlySumComponent', () => {
  let component: ReportReservationMonthlySumComponent;
  let fixture: ComponentFixture<ReportReservationMonthlySumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportReservationMonthlySumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportReservationMonthlySumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
