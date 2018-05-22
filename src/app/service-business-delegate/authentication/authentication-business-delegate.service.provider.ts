import { AuthenticationBusinessDelegateServiceACI } from './authentication-business-delegate.service.aci';
import { AuthenticationBusinessDelegateService } from './authentication-business-delegate.service';
export let AuthenticationBusinessDelegateServiceProviders = [
  {
    provide: AuthenticationBusinessDelegateServiceACI,
    useClass: AuthenticationBusinessDelegateService
  }
];
