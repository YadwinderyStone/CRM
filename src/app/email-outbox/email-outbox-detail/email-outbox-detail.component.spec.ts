import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailOutboxDetailComponent } from './email-outbox-detail.component';

describe('EmailOutboxDetailComponent', () => {
  let component: EmailOutboxDetailComponent;
  let fixture: ComponentFixture<EmailOutboxDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailOutboxDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailOutboxDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
