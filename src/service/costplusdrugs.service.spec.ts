import { TestBed } from '@angular/core/testing';

import { CostplusdrugsService } from './costplusdrugs.service';

describe('CostplusdrugsService', () => {
  let service: CostplusdrugsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostplusdrugsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
