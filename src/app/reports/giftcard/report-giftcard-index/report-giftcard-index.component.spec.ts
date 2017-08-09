import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGiftcardIndexComponent } from './report-giftcard-index.component';

describe('ReportGiftcardIndexComponent', () => {
  let component: ReportGiftcardIndexComponent;
  let fixture: ComponentFixture<ReportGiftcardIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportGiftcardIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportGiftcardIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
