import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCtiUsersComponent } from './add-cti-users.component';

describe('AddCtiUsersComponent', () => {
  let component: AddCtiUsersComponent;
  let fixture: ComponentFixture<AddCtiUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCtiUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCtiUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
