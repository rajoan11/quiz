import { NgModule } from '@angular/core';
import { QuizBusinessDelegateServiceProviders } from './quiz';
import { AuthenticationBusinessDelegateServiceProviders } from './authentication';

@NgModule({
  providers: [
    ...QuizBusinessDelegateServiceProviders,
    ...AuthenticationBusinessDelegateServiceProviders
  ]
})
export class BusinessDelegateModule {}
