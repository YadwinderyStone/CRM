import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionTypeComponent } from './interaction-type.component';

describe('InteractionTypeComponent', () => {
  let component: InteractionTypeComponent;
  let fixture: ComponentFixture<InteractionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
