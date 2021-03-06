import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ResultatRootComponent } from '../../../presentation/resultat/resultat-root/resultat-root.component';
import { QuizStatComponent } from '../../../presentation/resultat/quiz-stat/quiz-stat.component';
import { QuizApercuComponent } from '../../../presentation/resultat/quiz-apercu/quiz-apercu.component';

const routes: Routes = [
  {
    path: 'resultat',
    component: ResultatRootComponent,
    children: [
      { path: '', redirectTo: 'stat/:id', pathMatch: 'full' },
      {
        path: 'stat/:id',
        component: QuizStatComponent
      },
      {
        path: 'preview/:id',
        component: QuizApercuComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultatRoutingModule {}
