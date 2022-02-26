import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private BASE_URL = this.configService.config.globalConfig.urlApp;
  private TEAMS = this.BASE_URL + environment.TEAMS;

  constructor(
    private readonly http: HttpClient,
    private readonly configService: ConfigService
  ) { }

  public getTeam(): Observable<any> {
    return this.http.get<any>(this.TEAMS, {});
  }
}
