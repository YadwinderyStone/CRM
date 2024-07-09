import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SLAReportsComponent } from './sla-reports.component';

describe('SLAReportsComponent', () => {
  let component: SLAReportsComponent;
  let fixture: ComponentFixture<SLAReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SLAReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SLAReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
