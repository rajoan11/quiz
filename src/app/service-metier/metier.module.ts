import { NgModule } from '@angular/core';
import { QuizMetierServiceProviders } from './quiz-admin';
@NgModule({
  providers: [...QuizMetierServiceProviders]
})
export class MetierModule {}
