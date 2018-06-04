import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RubriqueService {
  public rubrique$: BehaviorSubject<any> = new BehaviorSubject({});

  constructor() {}

  public setRubrique(rubriques: Array<any>): void {
    this.rubrique$.next(rubriques);
  }
  public getRubrique(): Observable<any> {
    return this.rubrique$.asObservable();
  }
}
