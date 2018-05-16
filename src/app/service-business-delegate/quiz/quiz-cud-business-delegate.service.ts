import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { QuizCudBusinessDelegateServiceACI } from '.';
import { environment } from '../../../environments/environment';

@Injectable()
export class QuizCudBusinessDelegateService
  implements QuizCudBusinessDelegateServiceACI {
  constructor(private http: HttpClient) {}

  createQuiz(quiz: any) {
    const url = `${environment.apiUrl}/admin/formulaire`;
    return this.http.post<any>(url, quiz);
  }
  updateQuiz(quiz: any) {
    throw new Error('Method not implemented.');
  }
  deleteQuiz(quizId: number) {
    const url = `assets/mock/question.json`;
    return this.http.delete(url);
  }
}
