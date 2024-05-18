import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionDetailViewDialogComponent } from './interaction-detail-view-dialog.component';

describe('InteractionDetailViewDialogComponent', () => {
  let component: InteractionDetailViewDialogComponent;
  let fixture: ComponentFixture<InteractionDetailViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionDetailViewDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractionDetailViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
