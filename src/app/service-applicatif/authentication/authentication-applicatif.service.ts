import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationApplicatifServiceACI } from './authentication-applicatif.service.aci';
import { AuthenticationMetierServiceACI } from '../../service-metier/authentication';

@Injectable()
export class AuthenticationApplicatifService
  implements AuthenticationApplicatifServiceACI {
  constructor(
    private authenticationMetierServiceACI: AuthenticationMetierServiceACI
  ) {}

  login(token: string): Observable<any> {
    return this.authenticationMetierServiceACI.login(token);
  }
}
