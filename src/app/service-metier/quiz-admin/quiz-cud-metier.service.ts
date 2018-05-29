import { Injectable } from '@angular/core';

import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

import { QuizCudMetierServiceACI } from '.';
import { QuizDto, QuizDo, RubricDo, RubricDto } from '../../donnee/quiz';
import { QuizCudBusinessDelegateServiceACI } from '../../service-business-delegate/quiz';

@Injectable()
export class QuizCudMetierService implements QuizCudMetierServiceACI {
  constructor(
    private quizCudBusinessDelegateService: QuizCudBusinessDelegateServiceACI
  ) {}

  createQuiz(quiz: QuizDto) {
    const quizCopy = JSON.parse(JSON.stringify(quiz));
    this.formatQuizToSave(quizCopy);
    const { id, created_at, ...quizToSave } = quizCopy;
    return this.quizCudBusinessDelegateService
      .createQuiz(quizToSave)
      .pipe(
        tap(_ => this.log(`create successfully`)),
        catchError(this.handleError)
      );
  }
  updateQuiz(quiz: QuizDto) {
    return this.quizCudBusinessDelegateService
      .updateQuiz(quiz)
      .pipe(
        tap(_ => this.log(`update successfully`)),
        catchError(this.handleError)
      );
  }
  deleteQuiz(quizId: number) {
    return this.quizCudBusinessDelegateService
      .deleteQuiz(quizId)
      .pipe(
        tap(_ => this.log(`delete successfully`)),
        catchError(this.handleError)
      );
  }
  changeStatusQuiz(quizId: number) {
    return this.quizCudBusinessDelegateService
      .changeStatusQuiz(quizId)
      .pipe(
        tap(_ => this.log(`update successfully`)),
        catchError(this.handleError)
      );
  }

  private handleError(error) {
    return Observable.throw(error && error.message);
  }

  private log(message: string) {
    console.log(message);
  }

  private formatQuizToSave(quiz: QuizDto): void {
    quiz.rubriques.forEach((rubrique: RubricDto) => {
      rubrique.contents_rubriques.forEach(content => {
        if (content && content.type_content === 'question') {
          rubrique.question.push(content);
        } else {
          rubrique.meta_contents.push(content);
        }
      });
      rubrique.contents_rubriques = [];
    });
  }
}
