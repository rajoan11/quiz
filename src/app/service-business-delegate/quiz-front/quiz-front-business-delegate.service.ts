import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { QuizFrontBusinessDelegateServiceACI } from './quiz-front-business-delegate.service.aci';
import { environment } from '../../../environments/environment';

@Injectable()
export class QuizFrontBusinessDelegateService
  implements QuizFrontBusinessDelegateServiceACI {
  constructor(private http: HttpClient) {}

  public getQuiz(id: any) {
    return this.http.get(`${environment.apiUrl}/front/form/${id}`);
  }

  public getQuizCorrection(id: any) {
    // return this.http.get('assets/mock/correction-quiz.json');

    return this.http.get(`${environment.apiUrl}/front/record/${id}`);
  }

  public saveQuizResponse(quiz: any) {
    return this.http.post(`${environment.apiUrl}/front/record`, {
      rubriques: quiz
    });
  }
}
