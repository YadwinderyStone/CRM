import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProblemDialogComponent } from './add-edit-problem-dialog.component';

describe('AddEditProblemDialogComponent', () => {
  let component: AddEditProblemDialogComponent;
  let fixture: ComponentFixture<AddEditProblemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditProblemDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditProblemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
