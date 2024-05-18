import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailOutboxComponent } from './email-outbox.component';

describe('EmailOutboxComponent', () => {
  let component: EmailOutboxComponent;
  let fixture: ComponentFixture<EmailOutboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailOutboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailOutboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
