import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastyModule } from 'ngx-toasty';

import { ToastService } from './service/toaster.service';
import { EnterpriseService } from './service/enterprise.service';
import { QuestionService } from './service/question.service';
import { AutofocusDirective } from './directive/autofocus.directive';
import { RubriqueService } from './service/rubrique.service';

@NgModule({
  imports: [CommonModule, ToastyModule.forRoot()],
  declarations: [AutofocusDirective],
  providers: [
    ToastService,
    QuestionService,
    EnterpriseService,
    RubriqueService
  ],

  exports: [ToastyModule, AutofocusDirective]
})
export class CommunModule {}
