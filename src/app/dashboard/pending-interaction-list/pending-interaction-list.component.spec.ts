import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingInteractionListComponent } from './pending-interaction-list.component';

describe('PendingInteractionListComponent', () => {
  let component: PendingInteractionListComponent;
  let fixture: ComponentFixture<PendingInteractionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingInteractionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingInteractionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
