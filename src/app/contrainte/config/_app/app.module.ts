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
import { ResultatPresentationModule } from '../../../presentation/resultat/resultat-presentation.module';
import { FrontPresentationModule } from '../../../presentation/front/front-presentation.module';
import { CommunModule } from '../../../commun/commun.module';
import { AuthenticationModule } from '../../../presentation/authentication/authentication.module';
import { MAT_DATE_LOCALE } from '@angular/material';

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
    ResultatPresentationModule,
    FrontPresentationModule,
    CommunModule,
    AuthenticationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ]
})
export class AppModule {
  constructor() {}
}
