import { QuizCudBusinessDelegateServiceACI } from './quiz-cud-business-delegate.service.aci';
import { QuizCudBusinessDelegateService } from './quiz-cud-business-delegate.service';
import { QuizReadBusinessDelegateServiceACI } from './quiz-read-business-delegate.service.aci';
import { QuizReadBusinessDelegateService } from './quiz-read-business-delegate.service';

export let QuizBusinessDelegateServiceProviders = [
  {
    provide: QuizCudBusinessDelegateServiceACI,
    useClass: QuizCudBusinessDelegateService
  },
  {
    provide: QuizReadBusinessDelegateServiceACI,
    useClass: QuizReadBusinessDelegateService
  }
];
