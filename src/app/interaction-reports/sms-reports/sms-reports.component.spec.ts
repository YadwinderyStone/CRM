import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsReportsComponent } from './sms-reports.component';

describe('SmsReportsComponent', () => {
  let component: SmsReportsComponent;
  let fixture: ComponentFixture<SmsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
