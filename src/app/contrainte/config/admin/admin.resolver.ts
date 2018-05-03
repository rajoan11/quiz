import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { QuizDto } from '../../../donnee/quiz';
import { QuizReadApplicatifServiceACI } from '../../../service-applicatif/quiz-admin';

@Injectable()
export class QuizResolver implements Resolve<QuizDto[] | QuizDto> {
  constructor(
    private QuizReadApplicatifService: QuizReadApplicatifServiceACI
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<QuizDto[] | QuizDto> {
    if (route.params['id']) {
      console.log('id: ', +route.params['id']);
      return this.QuizReadApplicatifService.getQuiz(route.params['id']);
    } else {
      return this.QuizReadApplicatifService.getQuizs({});
    }
  }
}
