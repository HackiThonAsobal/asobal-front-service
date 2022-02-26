import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers = new HttpHeaders({});
    const token: string = sessionStorage.getItem('token');

    if (request.url.indexOf('login') === -1) {
      headers = headers.set('authorization', `Bearer ${token}`);
    }

    request = request.clone({
      withCredentials: true,
      headers
    });

    return next.handle(request);
  }
}
