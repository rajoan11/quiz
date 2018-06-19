import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { QuizStatComponent } from './quiz-stat/quiz-stat.component';
import { ResultatRootComponent } from './resultat-root/resultat-root.component';
import { ResultatRoutingModule } from '../../contrainte/config/resultat/resultat-routing.module';
import { QuizApercuComponent } from './quiz-apercu/quiz-apercu.component';
import { SharedModule } from '../../contrainte/config/shared/shared.module';
@NgModule({
  imports: [CommonModule, ResultatRoutingModule, NgxChartsModule, SharedModule],
  declarations: [QuizStatComponent, ResultatRootComponent, QuizApercuComponent]
})
export class ResultatPresentationModule {}
