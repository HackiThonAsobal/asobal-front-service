import { Injectable, NgZone } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  private BASE_URL = this.configService.config.globalConfig.urlAppNotification;

  constructor(
    private readonly configService: ConfigService,
    private _zone: NgZone
  ) {}

  getEventSource(url: string): EventSource {
    return new EventSource(url);
  }

  getServerSendEvents(): Observable<MessageEvent<{title: string, description: string, type: string}>> {
    return new Observable((subscriber) => {
      const eventSource = this.getEventSource(this.BASE_URL + '/consume');

      eventSource.onmessage = (event) => {
        this._zone.run(() => {
          subscriber.next(event);
        });
      };

      eventSource.onerror = (error) => {
        this._zone.run(() => {
          subscriber.error(error)
        })
      }
    });
  }
}
