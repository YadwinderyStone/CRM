import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositionListComponent } from './disposition-list.component';

describe('DispositionListComponent', () => {
  let component: DispositionListComponent;
  let fixture: ComponentFixture<DispositionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispositionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispositionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
