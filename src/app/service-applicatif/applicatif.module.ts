import { NgModule } from '@angular/core';
import { QuizApplicatifServiceProviders } from './quiz-admin';

@NgModule({
  providers: [...QuizApplicatifServiceProviders]
})
export class ApplicatifModule {}
