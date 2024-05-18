import { TestBed } from '@angular/core/testing';

import { EmailOutboxService } from './email-outbox.service';

describe('EmailOutboxService', () => {
  let service: EmailOutboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailOutboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
