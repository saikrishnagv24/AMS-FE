import { TestBed } from '@angular/core/testing';

import { FrequencyOfTestingService } from './frequency-of-testing.service';

describe('FrequencyOfTestingService', () => {
  let service: FrequencyOfTestingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrequencyOfTestingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
