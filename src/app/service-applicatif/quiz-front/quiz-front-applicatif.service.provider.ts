import { QuizFrontApplicatifServiceACI } from './quiz-front-applicatif.service.aci';
import { QuizFrontApplicatifService } from './quiz-front-applicatif.service';

export let QuizFrontApplicatifServiceProviders = [
  {
    provide: QuizFrontApplicatifServiceACI,
    useClass: QuizFrontApplicatifService
  }
];
