import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailResolutionReportsComponent } from './email-resolution-reports.component';

describe('EmailResolutionReportsComponent', () => {
  let component: EmailResolutionReportsComponent;
  let fixture: ComponentFixture<EmailResolutionReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailResolutionReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailResolutionReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
