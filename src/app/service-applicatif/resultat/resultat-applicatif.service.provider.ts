import { ResultatApplicatifServiceACI } from './resultat-applicatif.service.aci';
import { ResultatApplicatifService } from './resultat-applicatif.service';

export let ResultatApplicatifServiceProviders = [
  {
    provide: ResultatApplicatifServiceACI,
    useClass: ResultatApplicatifService
  }
];
