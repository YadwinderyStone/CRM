import { TestBed } from '@angular/core/testing';

import { CtiUsersService } from './cti-users.service';

describe('CtiUsersService', () => {
  let service: CtiUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CtiUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
