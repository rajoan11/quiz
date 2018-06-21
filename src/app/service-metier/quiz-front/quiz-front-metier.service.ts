import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { QuizFrontBusinessDelegateServiceACI } from '../../service-business-delegate/quiz-front';
import { QuizDto } from '../../donnee/quiz/';
import { QuizFrontMetierServiceACI } from '.';

@Injectable()
export class QuizFrontMetierService implements QuizFrontMetierServiceACI {
  constructor(
    private quizFrontBdService: QuizFrontBusinessDelegateServiceACI
  ) {}

  getQuiz(id: number) {
    return this.quizFrontBdService.getQuiz(id).pipe(
      tap(_ => {}),
      catchError(this.handleError)
    );
  }

  getQuizCorrection(id: number) {
    return this.quizFrontBdService.getQuizCorrection(id).pipe(
      tap(_ => {}),
      catchError(this.handleError)
    );
  }

  saveQuizResponse(quiz: any) {
    return this.quizFrontBdService.saveQuizResponse(quiz).pipe(
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
