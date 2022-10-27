import { TestBed } from '@angular/core/testing';

import { HarddiscTypeService } from './harddisc-type.service';

describe('HarddiscTypeService', () => {
  let service: HarddiscTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HarddiscTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
