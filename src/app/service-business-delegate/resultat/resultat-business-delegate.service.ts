import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { ResultatBusinessDelegateServiceACI } from './resultat-business-delegate.service.aci';
import { environment } from '../../../environments/environment';

@Injectable()
export class ResultatBusinessDelegateService
  implements ResultatBusinessDelegateServiceACI {

  constructor(private http: HttpClient) {}

  public getQuizStats(id: any) {
    return this.http.get(`${environment.apiUrl}/admin/form/${id}/resume`);
  }

  public getUsers(idQuiz: any) {
    return this.http.get('assets/mock/users.json');
  }

  public removeUser(idUser: number, idQuiz: any) {
    return this.http.get('assets/mock/users.json');
  }
}
