import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionListByTeamComponent } from './interaction-list-by-team.component';

describe('InteractionListByTeamComponent', () => {
  let component: InteractionListByTeamComponent;
  let fixture: ComponentFixture<InteractionListByTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionListByTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractionListByTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
