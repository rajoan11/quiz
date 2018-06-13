import { TestBed, inject } from '@angular/core/testing';

import { QuizReadApplicatifService } from './quiz-read-applicatif.service';

describe('QuizReadApplicatifService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizReadApplicatifService]
    });
  });

  it('should be created', inject(
    [QuizReadApplicatifService],
    (service: QuizReadApplicatifService) => {
      expect(service).toBeTruthy();
    }
  ));
});
