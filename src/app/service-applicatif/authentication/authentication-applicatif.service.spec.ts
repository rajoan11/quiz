import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationApplicatifService } from './authentication-applicatif.service';

describe('AuthenticationApplicatifService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationApplicatifService]
    });
  });

  it('should be created', inject([AuthenticationApplicatifService], (service: AuthenticationApplicatifService) => {
    expect(service).toBeTruthy();
  }));
});
