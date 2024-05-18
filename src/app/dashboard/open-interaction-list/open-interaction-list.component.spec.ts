import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenInteractionListComponent } from './open-interaction-list.component';

describe('OpenInteractionListComponent', () => {
  let component: OpenInteractionListComponent;
  let fixture: ComponentFixture<OpenInteractionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenInteractionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenInteractionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
