import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from '../../contrainte/config/admin/admin-routing.module';
import { SharedModule } from '../../contrainte/config/shared/shared.module';
import { ListQuizComponent } from './list-quiz/list-quiz.component';
import { AdminRootComponent } from './admin-root/admin-root.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, SharedModule],
  declarations: [ListQuizComponent, AdminRootComponent, CreateQuizComponent]
})
export class AdminPresentationModule {}
