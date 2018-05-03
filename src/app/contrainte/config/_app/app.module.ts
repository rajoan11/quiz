import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../interceptor/auth.interceptor';

import { AppComponent } from '../../../presentation/_app/app.component';

import { ApplicatifModule } from '../../../service-applicatif/applicatif.module';
import { MetierModule } from '../../../service-metier/metier.module';
import { BusinessDelegateModule } from '../../../service-business-delegate/business-delegate.module';

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AdminPresentationModule } from '../../../presentation/admin/admin-presentation.module';
import { QuizPresentationModule } from '../../../presentation/quiz/quiz-presentation.module';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ApplicatifModule,
    MetierModule,
    BusinessDelegateModule,
    SharedModule,
    AppRoutingModule,
    AdminPresentationModule,
    QuizPresentationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ]
})
export class AppModule {
  constructor() {}
}
