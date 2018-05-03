import { NgModule } from '@angular/core';
import { QuizBusinessDelegateServiceProviders } from './quiz';

@NgModule({
  providers: [...QuizBusinessDelegateServiceProviders]
})
export class BusinessDelegateModule {}
