import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionLogsComponent } from './interaction-logs.component';

describe('InteractionLogsComponent', () => {
  let component: InteractionLogsComponent;
  let fixture: ComponentFixture<InteractionLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionLogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractionLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
