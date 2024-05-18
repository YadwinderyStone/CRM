import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionBulkCloserComponent } from './interaction-bulk-closer.component';

describe('InteractionBulkCloserComponent', () => {
  let component: InteractionBulkCloserComponent;
  let fixture: ComponentFixture<InteractionBulkCloserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionBulkCloserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractionBulkCloserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
