import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionLastActionTakenComponent } from './interaction-last-action-taken.component';

describe('InteractionLastActionTakenComponent', () => {
  let component: InteractionLastActionTakenComponent;
  let fixture: ComponentFixture<InteractionLastActionTakenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionLastActionTakenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractionLastActionTakenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
