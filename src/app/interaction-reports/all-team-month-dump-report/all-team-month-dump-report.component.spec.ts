import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTeamMonthDumpReportComponent } from './all-team-month-dump-report.component';

describe('AllTeamMonthDumpReportComponent', () => {
  let component: AllTeamMonthDumpReportComponent;
  let fixture: ComponentFixture<AllTeamMonthDumpReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTeamMonthDumpReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTeamMonthDumpReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
