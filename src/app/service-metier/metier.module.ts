import { NgModule } from '@angular/core';
import { QuizMetierServiceProviders } from './quiz-admin';
import { AuthenticationMetierServiceProviders } from './authentication';
@NgModule({
  providers: [
    ...QuizMetierServiceProviders,
    ...AuthenticationMetierServiceProviders
  ]
})
export class MetierModule {}
