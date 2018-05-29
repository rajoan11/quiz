import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class QuestionService {
  public question$: BehaviorSubject<any> = new BehaviorSubject({});

  constructor() {}

  public setQuestionChange(value: boolean): void {
    this.question$.next(value);
  }

  public getQuestionChange(): Observable<any> {
    return this.question$.asObservable();
  }
}
