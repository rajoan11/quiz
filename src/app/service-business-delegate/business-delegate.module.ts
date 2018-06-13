import { NgModule } from '@angular/core';
import { QuizBusinessDelegateServiceProviders } from './quiz';
import { AuthenticationBusinessDelegateServiceProviders } from './authentication';
import { QuizFrontBusinessDelegateServiceProviders } from './quiz-front';

@NgModule({
  providers: [
    ...QuizBusinessDelegateServiceProviders,
    ...AuthenticationBusinessDelegateServiceProviders,
    ...QuizFrontBusinessDelegateServiceProviders
  ]
})
export class BusinessDelegateModule {}
