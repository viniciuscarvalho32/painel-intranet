import { TestBed } from '@angular/core/testing';

import { CcudetailsService } from './ccudetails.service';

describe('CcudetailsService', () => {
  let service: CcudetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CcudetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
