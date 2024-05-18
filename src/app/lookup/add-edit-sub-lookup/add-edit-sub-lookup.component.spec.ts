import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSubLookupComponent } from './add-edit-sub-lookup.component';

describe('AddEditSubLookupComponent', () => {
  let component: AddEditSubLookupComponent;
  let fixture: ComponentFixture<AddEditSubLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSubLookupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditSubLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
