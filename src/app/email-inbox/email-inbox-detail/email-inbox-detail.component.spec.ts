import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailInboxDetailComponent } from './email-inbox-detail.component';

describe('EmailInboxDetailComponent', () => {
  let component: EmailInboxDetailComponent;
  let fixture: ComponentFixture<EmailInboxDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailInboxDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailInboxDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
