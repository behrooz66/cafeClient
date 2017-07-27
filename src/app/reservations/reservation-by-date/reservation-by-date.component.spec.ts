import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationByDateComponent } from './reservation-by-date.component';

describe('ReservationByDateComponent', () => {
  let component: ReservationByDateComponent;
  let fixture: ComponentFixture<ReservationByDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationByDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
