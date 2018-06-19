import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FrontRootComponent } from '../../../presentation/front/front-root/front-root.component';
import { QuizzResponseComponent } from '../../../presentation/front/quizz-response/quizz-response.component';
import { QuizCorrectionComponent } from '../../../presentation/front/quiz-correction/quiz-correction.component';

const routes: Routes = [
  {
    path: 'front',
    component: FrontRootComponent,
    children: [
      { path: '', redirectTo: 'resp', pathMatch: 'full' },
      {
        path: 'resp/:id',
        component: QuizzResponseComponent
      },
      {
        path: 'correction/:id',
        component: QuizCorrectionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule {}
