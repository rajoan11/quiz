import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateQuizComponent } from '../../../presentation/quiz/create-quiz/create-quiz.component';
import { QuizRootComponent } from '../../../presentation/quiz/quiz-root/quiz-root.component';


const routes: Routes = [
  {
    path: 'quiz',
    component: QuizRootComponent,
    children: [
      { path: '', redirectTo: 'create', pathMatch: 'full' },
      { path: 'create', component: CreateQuizComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class QuizRoutingModule { }
