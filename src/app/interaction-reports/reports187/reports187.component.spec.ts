import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reports187Component } from './reports187.component';

describe('Reports187Component', () => {
  let component: Reports187Component;
  let fixture: ComponentFixture<Reports187Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Reports187Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reports187Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
