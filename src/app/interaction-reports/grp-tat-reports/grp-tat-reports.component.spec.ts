import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrpTatReportsComponent } from './grp-tat-reports.component';

describe('GrpTatReportsComponent', () => {
  let component: GrpTatReportsComponent;
  let fixture: ComponentFixture<GrpTatReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrpTatReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrpTatReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
