import { TestBed } from '@angular/core/testing';

import { CteService } from './cte.service';

describe('CteService', () => {
  let service: CteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
