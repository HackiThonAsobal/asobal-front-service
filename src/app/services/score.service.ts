import { Injectable } from '@angular/core';
import { IScoreRequest } from '../models/score-request.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private BASE_URL = this.configService.config.globalConfig.urlApp;
  private SCORE = this.BASE_URL + environment.SCORE;

  constructor(
    private readonly http: HttpClient,
    private readonly configService: ConfigService
  ) { }

  public postScore(body: IScoreRequest): Observable<any> {
    return this.http.post<IScoreRequest>(this.SCORE, body);
  }
}
