import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionAttachmentsListComponent } from './interaction-attachments-list.component';

describe('InteractionAttachmentsListComponent', () => {
  let component: InteractionAttachmentsListComponent;
  let fixture: ComponentFixture<InteractionAttachmentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionAttachmentsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractionAttachmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
