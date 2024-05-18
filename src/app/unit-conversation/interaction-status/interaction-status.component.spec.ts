import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionStatusComponent } from './interaction-status.component';

describe('InteractionStatusComponent', () => {
  let component: InteractionStatusComponent;
  let fixture: ComponentFixture<InteractionStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
