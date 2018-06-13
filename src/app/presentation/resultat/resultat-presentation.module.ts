import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';

import { QuizStatComponent } from './quiz-stat/quiz-stat.component';
import { ResultatRootComponent } from './resultat-root/resultat-root.component';
import { ResultatRoutingModule } from '../../contrainte/config/resultat/resultat-routing.module';
import { QuizApercuComponent } from './quiz-apercu/quiz-apercu.component';
import { SharedModule } from '../../contrainte/config/shared/shared.module';
FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);
@NgModule({
  imports: [CommonModule, ResultatRoutingModule, FusionChartsModule, SharedModule],
  declarations: [QuizStatComponent, ResultatRootComponent, QuizApercuComponent]
})
export class ResultatPresentationModule {}
