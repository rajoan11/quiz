import { QuizCudApplicatifServiceACI } from './quiz-cud-applicatif.service.aci';
import { QuizCudApplicatifService } from './quiz-cud-applicatif.service';
import { QuizReadApplicatifServiceACI } from './quiz-read-applicatif.service.aci';
import { QuizReadApplicatifService } from './quiz-read-applicatif.service';

export let QuizApplicatifServiceProviders = [
  {
    provide: QuizCudApplicatifServiceACI,
    useClass: QuizCudApplicatifService
  },
  {
    provide: QuizReadApplicatifServiceACI,
    useClass: QuizReadApplicatifService
  }
];
