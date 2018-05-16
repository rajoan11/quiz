import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastyModule } from 'ngx-toasty';

import { ToastService } from './service/toaster.service';

@NgModule({
  imports: [CommonModule, ToastyModule.forRoot()],
  declarations: [],
  providers: [ToastService],
  exports: [ToastyModule]
})
export class CommunModule {}
