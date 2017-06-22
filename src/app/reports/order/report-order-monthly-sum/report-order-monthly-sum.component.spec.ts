import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOrderMonthlySumComponent } from './report-order-monthly-sum.component';

describe('ReportOrderMonthlySumComponent', () => {
  let component: ReportOrderMonthlySumComponent;
  let fixture: ComponentFixture<ReportOrderMonthlySumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportOrderMonthlySumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOrderMonthlySumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
