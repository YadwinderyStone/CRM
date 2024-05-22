import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedInteractionListComponent } from './closed-interaction-list.component';

describe('ClosedInteractionListComponent', () => {
  let component: ClosedInteractionListComponent;
  let fixture: ComponentFixture<ClosedInteractionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosedInteractionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClosedInteractionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
