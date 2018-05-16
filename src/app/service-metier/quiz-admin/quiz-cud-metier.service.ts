import { Injectable } from '@angular/core';

import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { QuizCudMetierServiceACI } from '.';
import { QuizDto } from '../../donnee/quiz';
import { QuizCudBusinessDelegateServiceACI } from '../../service-business-delegate/quiz';

@Injectable()
export class QuizCudMetierService implements QuizCudMetierServiceACI {
  constructor(
    private quizCudBusinessDelegateService: QuizCudBusinessDelegateServiceACI
  ) {}

  createQuiz(quiz: QuizDto) {
    const { id, created_date, ...quizToSave } = quiz;
    return this.quizCudBusinessDelegateService
      .createQuiz(quizToSave)
      .pipe(
        tap(_ => this.log(`create successfully`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }
  updateQuiz(quiz: QuizDto) {
    return this.quizCudBusinessDelegateService
      .updateQuiz(quiz)
      .pipe(
        tap(_ => this.log(`update successfully`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }
  deleteQuiz(quizId: number) {
    return this.quizCudBusinessDelegateService
      .deleteQuiz(quizId)
      .pipe(
        tap(_ => this.log(`delete successfully`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
