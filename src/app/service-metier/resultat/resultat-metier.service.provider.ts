import { ResultatMetierServiceACI } from './resultat-metier.service.aci';
import { ResultatMetierService } from './resultat-metier.service';

export let ResultatMetierServiceProviders = [
  {
    provide: ResultatMetierServiceACI,
    useClass: ResultatMetierService
  }
];
