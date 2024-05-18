import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditInteractionTypeComponent } from './add-edit-interaction-type.component';

describe('AddEditInteractionTypeComponent', () => {
  let component: AddEditInteractionTypeComponent;
  let fixture: ComponentFixture<AddEditInteractionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditInteractionTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditInteractionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
