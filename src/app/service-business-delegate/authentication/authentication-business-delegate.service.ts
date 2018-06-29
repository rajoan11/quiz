import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthenticationBusinessDelegateServiceACI } from './authentication-business-delegate.service.aci';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationBusinessDelegateService
  implements AuthenticationBusinessDelegateServiceACI {
  constructor(private http: HttpClient) {}

  login(token: string): Observable<any> {
    const data = { token: token };
    const url = `${environment.apiUrl}/login`;
    return this.http.post<any>(url, data);
  }
  loginFront(user: any): Observable<any> {
    const url = `${environment.apiUrlDrupal}/ws/user/login`;
    return this.http.post<any>(url, user);
  }
}
