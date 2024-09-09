import { TestBed } from '@angular/core/testing';

import { SmsSettingConfigService } from './sms-setting-config.service';

describe('SmsSettingConfigService', () => {
  let service: SmsSettingConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmsSettingConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
