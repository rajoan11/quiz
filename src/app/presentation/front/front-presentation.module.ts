import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../contrainte/config/shared/shared.module';
import { FrontRootComponent } from './front-root/front-root.component';
import { FrontRoutingModule } from '../../contrainte/config/front/front-routing.module';
import { QuizzResponseComponent } from './quizz-response/quizz-response.component';

@NgModule({
  imports: [CommonModule, FrontRoutingModule, SharedModule],
  declarations: [FrontRootComponent, QuizzResponseComponent]
})
export class FrontPresentationModule {}
