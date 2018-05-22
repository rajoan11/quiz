import { AuthenticationApplicatifServiceACI } from './authentication-applicatif.service.aci';
import { AuthenticationApplicatifService } from './authentication-applicatif.service';

export let AuthenticationApplicatifServiceProviders = [
  {
    provide: AuthenticationApplicatifServiceACI,
    useClass: AuthenticationApplicatifService
  }
];
