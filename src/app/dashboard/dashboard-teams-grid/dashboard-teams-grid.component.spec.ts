import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTeamsGridComponent } from './dashboard-teams-grid.component';

describe('DashboardTeamsGridComponent', () => {
  let component: DashboardTeamsGridComponent;
  let fixture: ComponentFixture<DashboardTeamsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardTeamsGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTeamsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
