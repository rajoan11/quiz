import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminRootComponent } from '../../../presentation/admin/admin-root/admin-root.component';
import { ListQuizComponent } from '../../../presentation/admin/list-quiz/list-quiz.component';
import { CreateQuizComponent } from '../../../presentation/admin/create-quiz/create-quiz.component';
import { QuizResolver } from './admin.resolver';
import { FinishQuizzComponent } from '../../../presentation/admin/finish-quizz/finish-quizz.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminRootComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: ListQuizComponent,
        resolve: { enterprises: QuizResolver }
      },
      {
        path: 'create',
        component: CreateQuizComponent,
        resolve: { enterprises: QuizResolver }
      },
      {
        path: 'create/finish',
        component: FinishQuizzComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [QuizResolver]
})
export class AdminRoutingModule {}
