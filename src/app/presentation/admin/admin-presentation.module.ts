import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from '../../contrainte/config/admin/admin-routing.module';
import { SharedModule } from '../../contrainte/config/shared/shared.module';
import { ListQuizComponent } from './list-quiz/list-quiz.component';
import { AdminRootComponent } from './admin-root/admin-root.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { QuizQuestionComponent } from './quiz-question/quiz-question.component';
import { QuizRubricComponent } from './quiz-rubric/quiz-rubric.component';
import { ContentRubricComponent } from './content-rubric/content-rubric.component';
import { ContentRubricQuestionComponent } from './content-rubric-question/content-rubric-question.component';
import { FinishQuizzComponent } from './finish-quizz/finish-quizz.component';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, SharedModule],
  declarations: [
    ListQuizComponent,
    AdminRootComponent,
    CreateQuizComponent,
    QuizQuestionComponent,
    QuizRubricComponent,
    ContentRubricComponent,
    ContentRubricQuestionComponent,
    FinishQuizzComponent
  ]
})
export class AdminPresentationModule {}
