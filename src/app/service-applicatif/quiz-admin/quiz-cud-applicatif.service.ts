import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { QuizCudApplicatifServiceACI } from '.';
import { QuizCudMetierServiceACI } from '../../service-metier/quiz-admin';
import { QuizDto } from '../../donnee/quiz';

@Injectable()
export class QuizCudApplicatifService implements QuizCudApplicatifServiceACI {
  constructor(private quizCudMetierService: QuizCudMetierServiceACI) {}

  public createQuiz(quiz: QuizDto): Observable<any> {
    return this.quizCudMetierService.createQuiz(quiz);
  }
  public updateQuiz(quiz: QuizDto): Observable<any> {
    return this.quizCudMetierService.updateQuiz(quiz);
  }
  public deleteQuiz(quizId: number): Observable<any> {
    return this.quizCudMetierService.deleteQuiz(quizId);
  }
  public changeStatusQuiz(quizId: number): Observable<any> {
    return this.quizCudMetierService.changeStatusQuiz(quizId);
  }
}
