import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionHistoryComponent } from './interaction-history.component';

describe('InteractionHistoryComponent', () => {
  let component: InteractionHistoryComponent;
  let fixture: ComponentFixture<InteractionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
