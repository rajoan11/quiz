import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { QuizFrontApplicatifServiceACI } from '.';
import { QuizFrontMetierServiceACI } from '../../service-metier/quiz-front';

@Injectable()
export class QuizFrontApplicatifService implements QuizFrontApplicatifServiceACI {
  constructor(private quizFrontMetierService: QuizFrontMetierServiceACI) {}

  public getQuiz(id: any): Observable<any> {
    return this.quizFrontMetierService.getQuiz(id);
  }
}
