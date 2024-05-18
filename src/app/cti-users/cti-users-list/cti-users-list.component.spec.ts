import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtiUsersListComponent } from './cti-users-list.component';

describe('CtiUsersListComponent', () => {
  let component: CtiUsersListComponent;
  let fixture: ComponentFixture<CtiUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtiUsersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtiUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
