import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationBusinessDelegateService } from './authentication-business-delegate.service';

describe('AuthenticationBusinessDelegateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationBusinessDelegateService]
    });
  });

  it('should be created', inject([AuthenticationBusinessDelegateService], (service: AuthenticationBusinessDelegateService) => {
    expect(service).toBeTruthy();
  }));
});
