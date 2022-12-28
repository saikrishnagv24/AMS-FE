import { TestBed } from '@angular/core/testing';

import { AddAssetsService } from './add-assets.service';

describe('AddAssetsService', () => {
  let service: AddAssetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddAssetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
