import { TestBed } from '@angular/core/testing';

import { InteractionReportsService } from './interaction-reports.service';

describe('InteractionReportsService', () => {
  let service: InteractionReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteractionReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
