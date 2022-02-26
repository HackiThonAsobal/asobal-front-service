import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private BASE_URL = this.configService.config.globalConfig.urlApp;
  private FEED = this.BASE_URL + environment.FEED;

  constructor(
    private readonly http: HttpClient,
    private readonly configService: ConfigService
  ) { }

  public getFeed(): Observable<any> {
    return this.http.get<any>(this.FEED, {});
  }
}
