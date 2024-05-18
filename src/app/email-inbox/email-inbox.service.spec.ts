import { TestBed } from '@angular/core/testing';

import { EmailInboxService } from './email-inbox.service';

describe('EmailInboxService', () => {
  let service: EmailInboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailInboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
