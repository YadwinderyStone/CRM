import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSentItemComponent } from './email-sent-item.component';

describe('EmailSentItemComponent', () => {
  let component: EmailSentItemComponent;
  let fixture: ComponentFixture<EmailSentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailSentItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailSentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
