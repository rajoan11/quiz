import { QuizFrontBusinessDelegateServiceACI } from './quiz-front-business-delegate.service.aci';
import { QuizFrontBusinessDelegateService } from './quiz-front-business-delegate.service';

export let QuizFrontBusinessDelegateServiceProviders = [
  {
    provide: QuizFrontBusinessDelegateServiceACI,
    useClass: QuizFrontBusinessDelegateService
  }
];
