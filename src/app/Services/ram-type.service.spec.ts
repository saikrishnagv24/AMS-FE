import { TestBed } from '@angular/core/testing';

import { RamTypeService } from './ram-type.service';

describe('RamTypeService', () => {
  let service: RamTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RamTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
