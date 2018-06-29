import { ResultatBusinessDelegateServiceACI } from './resultat-business-delegate.service.aci';
import { ResultatBusinessDelegateService } from './resultat-business-delegate.service';

export let ResultatBusinessDelegateServiceProviders = [
  {
    provide: ResultatBusinessDelegateServiceACI,
    useClass: ResultatBusinessDelegateService
  }
];
