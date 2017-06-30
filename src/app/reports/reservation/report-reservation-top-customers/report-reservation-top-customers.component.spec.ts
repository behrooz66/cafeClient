import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportReservationTopCustomersComponent } from './report-reservation-top-customers.component';

describe('ReportReservationTopCustomersComponent', () => {
  let component: ReportReservationTopCustomersComponent;
  let fixture: ComponentFixture<ReportReservationTopCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportReservationTopCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportReservationTopCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
