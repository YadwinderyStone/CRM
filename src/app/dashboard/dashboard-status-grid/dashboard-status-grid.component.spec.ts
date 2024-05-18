import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStatusGridComponent } from './dashboard-status-grid.component';

describe('DashboardStatusGridComponent', () => {
  let component: DashboardStatusGridComponent;
  let fixture: ComponentFixture<DashboardStatusGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardStatusGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardStatusGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
