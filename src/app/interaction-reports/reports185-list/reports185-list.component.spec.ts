import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reports185ListComponent } from './reports185-list.component';

describe('Reports185ListComponent', () => {
  let component: Reports185ListComponent;
  let fixture: ComponentFixture<Reports185ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Reports185ListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reports185ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
