import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { LoggingService } from '../../services/logging.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private loggingService: LoggingService) { }

  handleError(error: HttpErrorResponse) {
    this.loggingService.logError(error);
  }
}
