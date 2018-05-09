import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { QuizCudBusinessDelegateServiceACI } from '.';

@Injectable()
export class QuizCudBusinessDelegateService
  implements QuizCudBusinessDelegateServiceACI {
  constructor(private http: HttpClient) {}

  createQuiz(Quiz: any) {
    throw new Error('Method not implemented.');
  }
  updateQuiz(Quiz: any) {
    throw new Error('Method not implemented.');
  }
  deleteQuiz(QuizId: number) {
    const url = `assets/mock/question.json`;
    return this.http.delete(url);
  }
}
