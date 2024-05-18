import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionCategoryComponent } from './interaction-category.component';

describe('InteractionCategoryComponent', () => {
  let component: InteractionCategoryComponent;
  let fixture: ComponentFixture<InteractionCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractionCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
