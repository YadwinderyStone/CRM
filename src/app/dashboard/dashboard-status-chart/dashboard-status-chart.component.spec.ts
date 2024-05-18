import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStatusChartComponent } from './dashboard-status-chart.component';

describe('DashboardStatusChartComponent', () => {
  let component: DashboardStatusChartComponent;
  let fixture: ComponentFixture<DashboardStatusChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardStatusChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardStatusChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
