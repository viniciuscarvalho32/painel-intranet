import { TestBed } from '@angular/core/testing';

import { CallSchenkerService } from './call-schenker.service';

describe('CallSchenkerService', () => {
  let service: CallSchenkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallSchenkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
