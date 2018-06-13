import { NgModule } from '@angular/core';
import { QuizApplicatifServiceProviders } from './quiz-admin';
import { AuthenticationApplicatifServiceProviders } from './authentication';
import { QuizFrontApplicatifServiceProviders } from './quiz-front';

@NgModule({
  providers: [
    ...QuizApplicatifServiceProviders,
    ...AuthenticationApplicatifServiceProviders,
    ...QuizFrontApplicatifServiceProviders
  ]
})
export class ApplicatifModule {}
