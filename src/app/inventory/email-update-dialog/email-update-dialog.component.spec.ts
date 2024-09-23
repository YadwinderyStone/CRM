import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailUpdateDialogComponent } from './email-update-dialog.component';

describe('EmailUpdateDialogComponent', () => {
  let component: EmailUpdateDialogComponent;
  let fixture: ComponentFixture<EmailUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailUpdateDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
