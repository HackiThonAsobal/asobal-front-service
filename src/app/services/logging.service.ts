import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  public loggingOn: boolean;

  logError(message: any) {
    // Send errors to server here
    if (this.loggingOn) {
      console.error('LoggingService: ', message);
    }
  }

  log(message: string) {
    if (this.loggingOn) {
      console.log('LoggingService: ', message);
    }
  }
}
