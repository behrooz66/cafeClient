import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOrderIndexComponent } from './report-order-index.component';

describe('ReportOrderIndexComponent', () => {
  let component: ReportOrderIndexComponent;
  let fixture: ComponentFixture<ReportOrderIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportOrderIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOrderIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
