import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authHeader = this.getToken();
    const escapedUrl = ['user/login', 'user/register'];
    if (escapedUrl.some(escaped => req.url.indexOf(escaped) >= 0)) {
      return next.handle(req);
    } else {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', authHeader)
      });
      return next.handle(authReq);
    }
  }

  getToken(): string {
    const token = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : null;
    return token;
  }
}
