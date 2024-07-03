import { TestBed } from '@angular/core/testing';

import { SentEmailService } from './sent-email.service';

describe('SentEmailService', () => {
  let service: SentEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SentEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
