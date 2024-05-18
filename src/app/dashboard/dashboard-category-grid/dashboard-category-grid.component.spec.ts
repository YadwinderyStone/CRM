import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCategoryGridComponent } from './dashboard-category-grid.component';

describe('DashboardCategoryGridComponent', () => {
  let component: DashboardCategoryGridComponent;
  let fixture: ComponentFixture<DashboardCategoryGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCategoryGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCategoryGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
