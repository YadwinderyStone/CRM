import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamInteractionsListComponent } from './team-interactions-list.component';

describe('TeamInteractionsListComponent', () => {
  let component: TeamInteractionsListComponent;
  let fixture: ComponentFixture<TeamInteractionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamInteractionsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamInteractionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
