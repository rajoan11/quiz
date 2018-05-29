import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastyModule } from 'ngx-toasty';

import { ToastService } from './service/toaster.service';
import { EnterpriseService } from './service/enterprise.service';
import { QuestionService } from './service/question.service';

@NgModule({
  imports: [CommonModule, ToastyModule.forRoot()],
  declarations: [],
  providers: [ToastService, QuestionService, EnterpriseService],

  exports: [ToastyModule]
})
export class CommunModule {}
