import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditInteractionCategoryComponent } from './add-edit-interaction-category.component';

describe('AddEditInteractionCategoryComponent', () => {
  let component: AddEditInteractionCategoryComponent;
  let fixture: ComponentFixture<AddEditInteractionCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditInteractionCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditInteractionCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
