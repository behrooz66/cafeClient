import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOrderRecordsMapComponent } from './report-order-records-map.component';

describe('ReportOrderRecordsMapComponent', () => {
  let component: ReportOrderRecordsMapComponent;
  let fixture: ComponentFixture<ReportOrderRecordsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportOrderRecordsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOrderRecordsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
