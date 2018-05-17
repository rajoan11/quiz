import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { QuizReadBusinessDelegateServiceACI } from '../../service-business-delegate/quiz';
import { QuizDto } from '../../donnee/quiz/';
import { QuizReadMetierServiceACI } from '.';

@Injectable()
export class QuizReadMetierService implements QuizReadMetierServiceACI {
  constructor(
    private quizReadBusinessDelegateService: QuizReadBusinessDelegateServiceACI
  ) {}
  getQuiz(id: number) {
    return this.quizReadBusinessDelegateService
      .getQuiz(id)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError)
      );
  }
  getQuizs(params: any) {
    return this.quizReadBusinessDelegateService
      .getQuizs(params)
      .pipe(
        tap(quizs => console.log(`fetched quizs`)),
        catchError(this.handleError)
      );
  }
  getQuestion() {
    return this.quizReadBusinessDelegateService
      .getQuestion()
      .pipe(
        tap(quizs => console.log(`fetched question`)),
        catchError(this.handleError)
      );
  }

  getEnterprises() {
    return this.quizReadBusinessDelegateService
      .getEnterprises()
      .pipe(
        tap(entreprises => console.log(`fetched entreprises`)),
        catchError(this.handleError)
      );
  }

  private handleError(error) {
    return Observable.throw(error && error.message);
  }

  private log(message: string) {
    console.log(+message);
  }
}
