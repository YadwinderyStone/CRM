import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionByCreatedNameComponent } from './interaction-by-created-name.component';

describe('InteractionByCreatedNameComponent', () => {
  let component: InteractionByCreatedNameComponent;
  let fixture: ComponentFixture<InteractionByCreatedNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionByCreatedNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractionByCreatedNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
