import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionNotesComponent } from './interaction-notes.component';

describe('InteractionNotesComponent', () => {
  let component: InteractionNotesComponent;
  let fixture: ComponentFixture<InteractionNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractionNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
