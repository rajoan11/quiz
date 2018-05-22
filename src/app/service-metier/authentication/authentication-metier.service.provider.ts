import { AuthenticationMetierServiceACI } from './authentication-metier.service.aci';
import { AuthenticationMetierService } from './authentication-metier.service';
export let AuthenticationMetierServiceProviders = [
  {
    provide: AuthenticationMetierServiceACI,
    useClass: AuthenticationMetierService
  }
];
