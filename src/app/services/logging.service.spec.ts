import { TestBed } from '@angular/core/testing';
import { LoggingService } from './logging.service';

const service: LoggingService = TestBed.inject(LoggingService);
const mockMessage = '1234';

describe('LoggingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
