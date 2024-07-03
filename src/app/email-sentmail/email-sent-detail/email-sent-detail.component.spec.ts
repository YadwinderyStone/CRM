import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSentDetailComponent } from './email-sent-detail.component';

describe('EmailSentDetailComponent', () => {
  let component: EmailSentDetailComponent;
  let fixture: ComponentFixture<EmailSentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailSentDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailSentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
