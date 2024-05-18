import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoleProblemComponent } from './add-role-problem.component';

describe('AddRoleProblemComponent', () => {
  let component: AddRoleProblemComponent;
  let fixture: ComponentFixture<AddRoleProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRoleProblemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRoleProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
