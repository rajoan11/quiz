import { QuizFrontMetierServiceACI } from './quiz-front-metier.service.aci';
import { QuizFrontMetierService } from './quiz-front-metier.service';

export let QuizFrontMetierServiceProviders = [
  {
    provide: QuizFrontMetierServiceACI,
    useClass: QuizFrontMetierService
  }
];
