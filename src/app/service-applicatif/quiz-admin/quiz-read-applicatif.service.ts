import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { QuizReadApplicatifServiceACI } from '.';
import { QuizReadMetierServiceACI } from '../../service-metier/quiz-admin';

@Injectable()
export class QuizReadApplicatifService implements QuizReadApplicatifServiceACI {
  constructor(private quizReadMetierService: QuizReadMetierServiceACI) {}

  public getQuiz(quizId: number): Observable<any> {
    return this.quizReadMetierService.getQuiz(quizId);
  }
  public getQuizs(params: any): Observable<any> {
    return this.quizReadMetierService.getQuizs(params);
  }
}
