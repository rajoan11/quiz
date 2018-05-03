import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { SharedModule } from '../../contrainte/config/shared/shared.module';
import { QuizRootComponent } from './quiz-root/quiz-root.component';
import { QuizRoutingModule } from '../../contrainte/config/quiz/quiz-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    QuizRoutingModule
  ],
  declarations: [CreateQuizComponent, QuizRootComponent]
})
export class QuizPresentationModule { }
