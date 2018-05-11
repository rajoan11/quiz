import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizStatComponent } from './quiz-stat/quiz-stat.component';
import { ResultatRootComponent } from './resultat-root/resultat-root.component';
import { ResultatRoutingModule } from '../../contrainte/config/resultat/resultat-routing.module';
import { QuizApercuComponent } from './quiz-apercu/quiz-apercu.component';

@NgModule({
  imports: [CommonModule, ResultatRoutingModule],
  declarations: [QuizStatComponent, ResultatRootComponent, QuizApercuComponent]
})
export class ResultatPresentationModule {}
