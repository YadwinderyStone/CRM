import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DumpReportFcrComponent } from './dump-report-fcr.component';

describe('DumpReportFcrComponent', () => {
  let component: DumpReportFcrComponent;
  let fixture: ComponentFixture<DumpReportFcrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DumpReportFcrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DumpReportFcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
