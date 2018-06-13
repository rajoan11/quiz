import { Injectable } from '@angular/core';

import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

import { QuizCudMetierServiceACI } from '.';
import {
  QuizDto,
  QuizDo,
  RubricDo,
  RubricDto,
  QuizzPatch
} from '../../donnee/quiz';
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
    return this.quizCudBusinessDelegateService.createQuiz(quizToSave).pipe(
      tap(_ => this.log(`create successfully`)),
      catchError(this.handleError)
    );
  }
  updateQuiz(quiz: QuizDto) {
    const quizCopy = JSON.parse(JSON.stringify(quiz));
    this.formatQuizToSave(quizCopy);
    const { created_at, ...quizToSave } = quizCopy;
    return this.quizCudBusinessDelegateService.updateQuiz(quizToSave).pipe(
      tap(_ => this.log(`update successfully`)),
      catchError(this.handleError)
    );
  }
  finishQuizz(quiz: QuizzPatch) {
    return this.quizCudBusinessDelegateService.finishQuizz(quiz).pipe(
      tap(_ => this.log(`update successfully`)),
      catchError(this.handleError)
    );
  }
  deleteQuiz(quizId: number) {
    return this.quizCudBusinessDelegateService.deleteQuiz(quizId).pipe(
      tap(_ => this.log(`delete successfully`)),
      catchError(this.handleError)
    );
  }
  changeStatusQuiz(quizId: number) {
    return this.quizCudBusinessDelegateService.changeStatusQuiz(quizId).pipe(
      tap(_ => this.log(`update successfully`)),
      catchError(this.handleError)
    );
  }

  private handleError(error) {
    return Observable.throw(error && error.message);
  }

  private log(message: string) {
    // console.log(message);
  }

  private formatQuizToSave(quiz: QuizDto): void {
    quiz.rubriques.forEach((rubrique: RubricDto, index) => {
      rubrique.questions = [];
      rubrique.meta_contents = [];
      if (!rubrique.name) {
        rubrique.name = `rubrique ${index}`;
      }
      rubrique.poids = index + 1;
      rubrique.contents_rubriques.forEach((content, indexC) => {
        if (content && content.type_content === 'question') {
          content.poids = indexC + 1;
          if (!content.description) {
            content.description = `question ${indexC}`;
          }
          rubrique.questions.push(content);
        } else {
          content.poids = indexC + 1;
          rubrique.meta_contents.push(content);
        }
      });
      rubrique.contents_rubriques = [];
    });
  }
}
