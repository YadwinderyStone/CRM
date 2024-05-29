import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubStatusListComponent } from './sub-status-list.component';

describe('SubStatusListComponent', () => {
  let component: SubStatusListComponent;
  let fixture: ComponentFixture<SubStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubStatusListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
