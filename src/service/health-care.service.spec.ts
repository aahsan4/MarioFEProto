import { TestBed } from '@angular/core/testing';

import { HealthCareService } from './health-care.service';

describe('HealthCareService', () => {
  let service: HealthCareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthCareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
