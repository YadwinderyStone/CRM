import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionAssignmentComponent } from './interaction-assignment.component';

describe('InteractionAssignmentComponent', () => {
  let component: InteractionAssignmentComponent;
  let fixture: ComponentFixture<InteractionAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionAssignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractionAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
