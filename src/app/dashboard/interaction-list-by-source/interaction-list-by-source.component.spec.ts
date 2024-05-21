import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionListBySourceComponent } from './interaction-list-by-source.component';

describe('InteractionListBySourceComponent', () => {
  let component: InteractionListBySourceComponent;
  let fixture: ComponentFixture<InteractionListBySourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionListBySourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractionListBySourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
