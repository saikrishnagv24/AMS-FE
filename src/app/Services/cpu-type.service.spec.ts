import { TestBed } from '@angular/core/testing';

import { CpuTypeService } from './cpu-type.service';

describe('CpuTypeService', () => {
  let service: CpuTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpuTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
