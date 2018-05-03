import { TestBed, inject } from '@angular/core/testing';

import { QuizReadMetierService } from './quiz-read-metier.service';

describe('QuizReadMetierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizReadMetierService]
    });
  });

  it('should be created', inject([QuizReadMetierService], (service: QuizReadMetierService) => {
    expect(service).toBeTruthy();
  }));
});
