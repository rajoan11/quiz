import { TestBed, inject } from '@angular/core/testing';

import { QuizCudBusinessDelegateService } from './quiz-cud-business-delegate.service';

describe('QuizCudBusinessDelegateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizCudBusinessDelegateService]
    });
  });

  it('should be created', inject([QuizCudBusinessDelegateService], (service: QuizCudBusinessDelegateService) => {
    expect(service).toBeTruthy();
  }));
});
