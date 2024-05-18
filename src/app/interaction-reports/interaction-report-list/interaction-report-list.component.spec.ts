import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionReportListComponent } from './interaction-report-list.component';

describe('InteractionReportListComponent', () => {
  let component: InteractionReportListComponent;
  let fixture: ComponentFixture<InteractionReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionReportListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractionReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
