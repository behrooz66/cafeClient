import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportReservationIndexComponent } from './report-reservation-index.component';

describe('ReportReservationIndexComponent', () => {
  let component: ReportReservationIndexComponent;
  let fixture: ComponentFixture<ReportReservationIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportReservationIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportReservationIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
