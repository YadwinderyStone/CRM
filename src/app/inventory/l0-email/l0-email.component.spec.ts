import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L0EmailComponent } from './l0-email.component';

describe('L0EmailComponent', () => {
  let component: L0EmailComponent;
  let fixture: ComponentFixture<L0EmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ L0EmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L0EmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
