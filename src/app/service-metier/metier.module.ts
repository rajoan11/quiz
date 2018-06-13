import { NgModule } from '@angular/core';
import { QuizMetierServiceProviders } from './quiz-admin';
import { AuthenticationMetierServiceProviders } from './authentication';
import { QuizFrontMetierServiceProviders } from './quiz-front';
@NgModule({
  providers: [
    ...QuizMetierServiceProviders,
    ...AuthenticationMetierServiceProviders,
    ...QuizFrontMetierServiceProviders
  ]
})
export class MetierModule {}
