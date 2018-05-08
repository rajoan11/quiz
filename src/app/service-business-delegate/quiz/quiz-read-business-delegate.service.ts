import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { QuizDto } from '../../donnee/quiz';
import { QuizReadBusinessDelegateServiceACI } from './index';

@Injectable()
export class QuizReadBusinessDelegateService
  implements QuizReadBusinessDelegateServiceACI {
  constructor(private http: HttpClient) {}

  getQuizs(params: any): Observable<QuizDto[]> {
    return this.http.get<QuizDto[]>('assets/mock/list-quiz.json');
  }

  getQuiz(id: number): Observable<any> {
    const url = `assets/mock/detail-quiz.json`;
    return this.http.get<QuizDto>(url);
  }

  getQuestion(): Observable<any> {
    const url = `assets/mock/question.json`;
    return this.http.get<QuizDto>(url);
  }
}
