import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap, map } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { ResultatBusinessDelegateServiceACI } from '../../service-business-delegate/resultat';
import { QuizDto } from '../../donnee/quiz/';
import { ResultatMetierServiceACI } from '.';

@Injectable()
export class ResultatMetierService implements ResultatMetierServiceACI {
  constructor(
    private resultatBdService: ResultatBusinessDelegateServiceACI
  ) {}

  getQuizStats(id: number) {
    return this.resultatBdService.getQuizStats(id).pipe(
      map(
        result => {
          result['rubriques'].forEach(rubrique => {
            rubrique.questions.forEach(question => {
              if ((question.type_question.slug === 'hour' || question.type_question.slug === 'date' ||
              question.type_question.slug === 'short_answer' || question.type_question.slug === 'width_answer')
              && question.response_inputs) {
                question.response_inputs = question.response_inputs.filter(input => !!input['value_input']);
              }
            });
          });
          return result;
        }),
      catchError(this.handleError)
    );
  }

  getUsers(idQuiz: any) {
    return this.resultatBdService.getUsers(idQuiz).pipe(
      tap(_ => {}),
      catchError(this.handleError)
    );
  }

  removeUser(idUser: number, idQuiz: any) {
    return this.resultatBdService.removeUser(idUser, idQuiz).pipe(
      tap(_ => {}),
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
}
