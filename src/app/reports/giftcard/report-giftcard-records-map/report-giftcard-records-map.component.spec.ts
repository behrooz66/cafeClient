import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGiftcardRecordsMapComponent } from './report-giftcard-records-map.component';

describe('ReportGiftcardRecordsMapComponent', () => {
  let component: ReportGiftcardRecordsMapComponent;
  let fixture: ComponentFixture<ReportGiftcardRecordsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportGiftcardRecordsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportGiftcardRecordsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
