import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleProblemlistComponent } from './role-problemlist.component';

describe('RoleProblemlistComponent', () => {
  let component: RoleProblemlistComponent;
  let fixture: ComponentFixture<RoleProblemlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleProblemlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleProblemlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
