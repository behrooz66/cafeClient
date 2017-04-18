import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationStatusesComponent } from './reservation-statuses.component';

describe('ReservationStatusesComponent', () => {
  let component: ReservationStatusesComponent;
  let fixture: ComponentFixture<ReservationStatusesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationStatusesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationStatusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
