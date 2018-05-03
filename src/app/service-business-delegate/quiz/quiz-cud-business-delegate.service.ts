import { Injectable } from '@angular/core';
import { QuizCudBusinessDelegateServiceACI } from '.';

@Injectable()
export class QuizCudBusinessDelegateService
  implements QuizCudBusinessDelegateServiceACI {
  constructor() {}

  createQuiz(Quiz: any) {
    throw new Error('Method not implemented.');
  }
  updateQuiz(Quiz: any) {
    throw new Error('Method not implemented.');
  }
  deleteQuiz(QuizId: number) {
    throw new Error('Method not implemented.');
  }
}
