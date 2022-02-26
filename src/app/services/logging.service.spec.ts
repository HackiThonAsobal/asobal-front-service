import { TestBed } from '@angular/core/testing';
import { LoggingService } from './logging.service';

const service: LoggingService = TestBed.inject(LoggingService);

describe('LoggingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
