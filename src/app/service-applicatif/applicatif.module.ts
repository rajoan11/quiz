import { NgModule } from '@angular/core';
import { QuizApplicatifServiceProviders } from './quiz-admin';
import { AuthenticationApplicatifServiceProviders } from './authentication';
import { QuizFrontApplicatifServiceProviders } from './quiz-front';
import { ResultatApplicatifServiceProviders } from './resultat';

@NgModule({
  providers: [
    ...QuizApplicatifServiceProviders,
    ...AuthenticationApplicatifServiceProviders,
    ...QuizFrontApplicatifServiceProviders,
    ...ResultatApplicatifServiceProviders
  ]
})
export class ApplicatifModule {}
