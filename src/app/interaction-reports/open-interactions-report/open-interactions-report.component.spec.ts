import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenInteractionsReportComponent } from './open-interactions-report.component';

describe('OpenInteractionsReportComponent', () => {
  let component: OpenInteractionsReportComponent;
  let fixture: ComponentFixture<OpenInteractionsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenInteractionsReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenInteractionsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
