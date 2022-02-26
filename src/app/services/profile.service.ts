import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProfileResponse } from '../models/profile-response.interface';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private BASE_URL = this.configService.config.globalConfig.urlApp;
  private PROFILE = this.BASE_URL + environment.PROFILE;

  constructor(
    private readonly http: HttpClient,
    private readonly configService: ConfigService
  ) { }

  public postProfile(): Observable<IProfileResponse> {
    return this.http.post<any>(this.PROFILE, {});
  }
}
