import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentProductivityComponent } from './agent-productivity.component';

describe('AgentProductivityComponent', () => {
  let component: AgentProductivityComponent;
  let fixture: ComponentFixture<AgentProductivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentProductivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentProductivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
