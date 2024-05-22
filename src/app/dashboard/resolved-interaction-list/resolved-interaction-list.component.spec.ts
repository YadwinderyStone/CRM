import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolvedInteractionListComponent } from './resolved-interaction-list.component';

describe('ResolvedInteractionListComponent', () => {
  let component: ResolvedInteractionListComponent;
  let fixture: ComponentFixture<ResolvedInteractionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResolvedInteractionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResolvedInteractionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
