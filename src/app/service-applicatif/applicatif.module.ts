import { NgModule } from '@angular/core';
import { QuizApplicatifServiceProviders } from './quiz-admin';
import { AuthenticationApplicatifServiceProviders } from './authentication';

@NgModule({
  providers: [
    ...QuizApplicatifServiceProviders,
    ...AuthenticationApplicatifServiceProviders
  ]
})
export class ApplicatifModule {}
