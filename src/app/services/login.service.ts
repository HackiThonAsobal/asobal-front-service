import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { ILoginRequest } from '../models/login-request.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private BASE_URL = this.configService.config.globalConfig.urlAppLogin;
  private LOGIN = this.BASE_URL + environment.LOGIN;

  constructor(
    private readonly http: HttpClient,
    private readonly configService: ConfigService) { }

  public postLogin(body: ILoginRequest): Observable<void> {
    return this.http.post<any>(this.LOGIN, body);
  }
}
