import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginReportsComponent } from './login-reports.component';

describe('LoginReportsComponent', () => {
  let component: LoginReportsComponent;
  let fixture: ComponentFixture<LoginReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
