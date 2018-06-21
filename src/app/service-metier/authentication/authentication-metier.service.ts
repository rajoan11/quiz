import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { AuthenticationMetierServiceACI } from './authentication-metier.service.aci';
import { AuthenticationBusinessDelegateServiceACI } from '../../service-business-delegate/authentication';

@Injectable()
export class AuthenticationMetierService
  implements AuthenticationMetierServiceACI {
  constructor(
    private authenticationBusinessDelegateServiceACI: AuthenticationBusinessDelegateServiceACI
  ) {}

  public login(token: string): Observable<any> {
    return this.authenticationBusinessDelegateServiceACI.login(token).pipe(
      tap(_ => this.log(`create successfully`)),
      catchError(this.handleError)
    );
  }

  private handleError(error) {
    return Observable.throw(
      error && {
        status: error.status,
        message: (error.error && error.error.message) || error.message
      }
    );
  }

  private log(message: string) {
    // console.log(+message);
  }
}
