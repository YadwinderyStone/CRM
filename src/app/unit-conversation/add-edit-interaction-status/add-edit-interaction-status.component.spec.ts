import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditInteractionStatusComponent } from './add-edit-interaction-status.component';

describe('AddEditInteractionStatusComponent', () => {
  let component: AddEditInteractionStatusComponent;
  let fixture: ComponentFixture<AddEditInteractionStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditInteractionStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditInteractionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
