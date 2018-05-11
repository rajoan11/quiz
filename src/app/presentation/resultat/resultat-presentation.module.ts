import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizStatComponent } from './quiz-stat/quiz-stat.component';
import { ResultatRootComponent } from './resultat-root/resultat-root.component';
import { ResultatRoutingModule } from '../../contrainte/config/resultat/resultat-routing.module';

@NgModule({
  imports: [CommonModule, ResultatRoutingModule],
  declarations: [QuizStatComponent, ResultatRootComponent]
})
export class ResultatPresentationModule {}
