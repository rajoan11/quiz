import { TestBed, inject } from '@angular/core/testing';

import { QuizReadBusinessDelegateService } from './quiz-read-business-delegate.service';

describe('QuizReadBusinessDelegateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizReadBusinessDelegateService]
    });
  });

  it('should be created', inject([QuizReadBusinessDelegateService], (service: QuizReadBusinessDelegateService) => {
    expect(service).toBeTruthy();
  }));
});
