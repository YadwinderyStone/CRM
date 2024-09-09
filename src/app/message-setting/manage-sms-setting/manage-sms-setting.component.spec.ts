import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSmsSettingComponent } from './manage-sms-setting.component';

describe('ManageSmsSettingComponent', () => {
  let component: ManageSmsSettingComponent;
  let fixture: ComponentFixture<ManageSmsSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSmsSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSmsSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
