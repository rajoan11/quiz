import { QuizCudMetierServiceACI } from './quiz-cud-metier.service.aci';
import { QuizCudMetierService } from './quiz-cud-metier.service';
import { QuizReadMetierServiceACI } from './quiz-read-metier.service.aci';
import { QuizReadMetierService } from './quiz-read-metier.service';
export let QuizMetierServiceProviders = [
  {
    provide: QuizCudMetierServiceACI,
    useClass: QuizCudMetierService
  },
  {
    provide: QuizReadMetierServiceACI,
    useClass: QuizReadMetierService
  }
];
