import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderListComponent } from './calender-list.component';

describe('CalenderListComponent', () => {
  let component: CalenderListComponent;
  let fixture: ComponentFixture<CalenderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalenderListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalenderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
