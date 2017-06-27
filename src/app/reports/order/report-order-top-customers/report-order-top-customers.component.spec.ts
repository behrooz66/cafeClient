import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOrderTopCustomersComponent } from './report-order-top-customers.component';

describe('ReportOrderTopCustomersComponent', () => {
  let component: ReportOrderTopCustomersComponent;
  let fixture: ComponentFixture<ReportOrderTopCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportOrderTopCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOrderTopCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
