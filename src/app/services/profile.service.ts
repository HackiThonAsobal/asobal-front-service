import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
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
  public profile: BehaviorSubject<any> = new BehaviorSubject<any>({});
  profile$ = this.profile.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly configService: ConfigService
  ) { }

  public postProfile(): Observable<IProfileResponse> {
    return this.http.post<any>(this.PROFILE, {});
  }

  public putProfile(body): Observable<IProfileResponse> {
    return this.http.put<any>(this.PROFILE, body);
  }

  sendProfile(profile: any) {
    this.profile.next(profile);
  }
}
