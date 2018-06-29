import { NgModule } from '@angular/core';
import { QuizMetierServiceProviders } from './quiz-admin';
import { AuthenticationMetierServiceProviders } from './authentication';
import { QuizFrontMetierServiceProviders } from './quiz-front';
import { ResultatMetierServiceProviders } from './resultat';

@NgModule({
  providers: [
    ...QuizMetierServiceProviders,
    ...AuthenticationMetierServiceProviders,
    ...QuizFrontMetierServiceProviders,
    ...ResultatMetierServiceProviders
  ]
})
export class MetierModule {}
