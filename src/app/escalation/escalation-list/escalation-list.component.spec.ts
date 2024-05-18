import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalationListComponent } from './escalation-list.component';

describe('EscalationListComponent', () => {
  let component: EscalationListComponent;
  let fixture: ComponentFixture<EscalationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscalationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscalationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
