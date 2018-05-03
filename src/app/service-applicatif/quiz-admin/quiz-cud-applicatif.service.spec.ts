import { TestBed, inject } from '@angular/core/testing';

import { QuizCudApplicatifService } from './quiz-cud-applicatif.service';

describe('QuizCudApplicatifService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizCudApplicatifService]
    });
  });

  it('should be created', inject([QuizCudApplicatifService], (service: QuizCudApplicatifService) => {
    expect(service).toBeTruthy();
  }));
});
