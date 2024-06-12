import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionEmailOldComponent } from './interaction-email-old.component';

describe('InteractionEmailOldComponent', () => {
  let component: InteractionEmailOldComponent;
  let fixture: ComponentFixture<InteractionEmailOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionEmailOldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractionEmailOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
