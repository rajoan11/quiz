import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ResultatApplicatifServiceACI } from '.';
import { ResultatMetierServiceACI } from '../../service-metier/resultat';

@Injectable()
export class ResultatApplicatifService implements ResultatApplicatifServiceACI {
  constructor(private resultatMetierService: ResultatMetierServiceACI) {}

  public getQuizStats(id: any): Observable<any> {
    return this.resultatMetierService.getQuizStats(id);
  }

  public getUsers(idQuiz): Observable<any> {
    return this.resultatMetierService.getUsers(idQuiz);
  }

  public removeUser(idUser: number, idQuiz: any): Observable<any> {
    return this.resultatMetierService.removeUser(idUser, idQuiz);
  }
}
