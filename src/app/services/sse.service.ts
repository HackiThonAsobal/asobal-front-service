import { Injectable, NgZone } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  private BASE_URL = this.configService.config.globalConfig.urlAppNotification;
  private eventSource: EventSource;

  constructor(
    private readonly configService: ConfigService
  ) {}

  getEventSource(url: string): EventSource {
    return new EventSource(url);
  }

  closeEventSource(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }

  getServerSendEvents(): Observable<
    MessageEvent<{ title: string; description: string; type: string }>
  > {
    return new Observable((subscriber) => {
      this.eventSource = this.getEventSource(this.BASE_URL + '/consume');

      this.eventSource.onmessage = (event) => {
        subscriber.next(event);
      };

      this.eventSource.onerror = (error) => {
        subscriber.error(error);
      };
    });
  }
}
