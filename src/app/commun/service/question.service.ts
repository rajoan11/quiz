import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class QuestionService {
  public questionChange$: BehaviorSubject<any> = new BehaviorSubject({});
  public question$: BehaviorSubject<any> = new BehaviorSubject({});

  constructor() {}

  public setQuestionChange(value: boolean): void {
    this.questionChange$.next(value);
  }

  public getQuestionChange(): Observable<any> {
    return this.questionChange$.asObservable();
  }
  public setQuestions(questions: Array<any>): void {
    this.question$.next(questions);
  }

  public getQuestions(): Observable<any> {
    return this.question$.asObservable();
  }
}
