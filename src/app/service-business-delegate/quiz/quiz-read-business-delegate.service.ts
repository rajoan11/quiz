import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { QuizDto } from '../../donnee/quiz';
import { QuizReadBusinessDelegateServiceACI } from './index';
import { environment } from '../../../environments/environment';

@Injectable()
export class QuizReadBusinessDelegateService
  implements QuizReadBusinessDelegateServiceACI {
  constructor(private http: HttpClient) {}

  getQuizs(params: any): Observable<QuizDto[]> {
    const myParams = this.getHttpParams(params);
    return this.http.get<QuizDto[]>(`${environment.apiUrl}/admin/forms`, {
      params: myParams
    });
  }

  getQuiz(id: number): Observable<any> {
    const url = `assets/mock/detail-quiz.json`;
    return this.http.get<QuizDto>(url);
  }

  getQuestion(): Observable<any> {
    const url = `assets/mock/question.json`;
    return this.http.get<QuizDto>(url);
  }

  getEnterprises(): Observable<any> {
    const url = `${environment.apiUrlDrupal}/entreprise/all`;
    return this.http.get<any>(url);
  }

  private getHttpParams(args: any) {
    let params = new HttpParams();
    Object.keys(args)
      .filter(key => args[key] != null)
      .forEach(key => (params = params.append(key, args[key])));

    return params;
  }
}
