import { TestBed } from '@angular/core/testing';
import { MessagesService } from './messages.service';

describe('MensagensService', () => {
  let service: MessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
