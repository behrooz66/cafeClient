import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportReservationRecordsMapComponent } from './report-reservation-records-map.component';

describe('ReportReservationRecordsMapComponent', () => {
  let component: ReportReservationRecordsMapComponent;
  let fixture: ComponentFixture<ReportReservationRecordsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportReservationRecordsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportReservationRecordsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
