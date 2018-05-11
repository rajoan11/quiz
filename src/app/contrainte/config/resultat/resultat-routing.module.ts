import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ResultatRootComponent } from '../../../presentation/resultat/resultat-root/resultat-root.component';
import { QuizStatComponent } from '../../../presentation/resultat/quiz-stat/quiz-stat.component';

const routes: Routes = [
  {
    path: 'resultat',
    component: ResultatRootComponent,
    children: [
      { path: '', redirectTo: 'stat', pathMatch: 'full' },
      {
        path: 'stat',
        component: QuizStatComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultatRoutingModule {}
