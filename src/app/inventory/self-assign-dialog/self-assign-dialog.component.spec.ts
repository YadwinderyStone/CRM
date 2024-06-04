import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfAssignDialogComponent } from './self-assign-dialog.component';

describe('SelfAssignDialogComponent', () => {
  let component: SelfAssignDialogComponent;
  let fixture: ComponentFixture<SelfAssignDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfAssignDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfAssignDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
