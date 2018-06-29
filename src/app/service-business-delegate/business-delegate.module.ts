import { NgModule } from '@angular/core';
import { QuizBusinessDelegateServiceProviders } from './quiz';
import { AuthenticationBusinessDelegateServiceProviders } from './authentication';
import { QuizFrontBusinessDelegateServiceProviders } from './quiz-front';
import { ResultatBusinessDelegateServiceProviders } from './resultat';
@NgModule({
  providers: [
    ...QuizBusinessDelegateServiceProviders,
    ...AuthenticationBusinessDelegateServiceProviders,
    ...QuizFrontBusinessDelegateServiceProviders,
    ...ResultatBusinessDelegateServiceProviders
  ]
})
export class BusinessDelegateModule {}
