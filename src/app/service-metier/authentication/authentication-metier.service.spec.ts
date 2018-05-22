import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationMetierService } from './authentication-metier.service';

describe('AuthenticationMetierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationMetierService]
    });
  });

  it('should be created', inject([AuthenticationMetierService], (service: AuthenticationMetierService) => {
    expect(service).toBeTruthy();
  }));
});
