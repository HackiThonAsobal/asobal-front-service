import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let httpTestingController: HttpTestingController;
  let service: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ],
      providers: [ConfigService
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ConfigService);

    sessionStorage.setItem('config', JSON.stringify('/assets/config.json'));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test init', () => {
    service.init();
    expect(service.config).not.toBeNull();
  });

});
