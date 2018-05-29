import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class EnterpriseService {
  public enterpriseO: BehaviorSubject<any> = new BehaviorSubject({});

  constructor() {}

  public setEnterprise(enterprise): void {
    this.enterpriseO.next(enterprise);
  }

  public getEnterprise(): Observable<Array<string>> {
    return this.enterpriseO.asObservable();
  }
}
