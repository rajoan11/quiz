import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { QuizCudBusinessDelegateServiceACI } from '.';
import { environment } from '../../../environments/environment';
import { QuizzPatch } from '../../donnee/quiz';

@Injectable()
export class QuizCudBusinessDelegateService
  implements QuizCudBusinessDelegateServiceACI {
  constructor(private http: HttpClient) {}

  changeStatusQuiz(QuizId: number) {
    const url = `${environment.apiUrl}/admin/form/${QuizId}/status`;
    return this.http.patch<any>(url, null);
  }

  createQuiz(quiz: any) {
    const url = `${environment.apiUrl}/admin/form`;
    return this.http.post<any>(url, quiz);
  }
  finishQuizz(quiz: QuizzPatch) {
    const url = `${environment.apiUrl}/admin/form/${quiz.id}/parameter`;
    return this.http.patch<any>(url, quiz);
  }
  updateQuiz(quiz: any) {
    const url = `${environment.apiUrl}/admin/form/${quiz.id}`;
    return this.http.put<any>(url, quiz);
  }
  deleteQuiz(quizId: number) {
    const url = `${environment.apiUrl}/admin/form/${quizId}`;
    return this.http.delete(url);
  }
}
