import { TestBed, inject } from '@angular/core/testing';

import { QuizCudMetierService } from './quiz-cud-metier.service';

describe('QuizCudMetierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizCudMetierService]
    });
  });

  it('should be created', inject([QuizCudMetierService], (service: QuizCudMetierService) => {
    expect(service).toBeTruthy();
  }));
});
