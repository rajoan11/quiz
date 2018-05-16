import { Component, OnInit } from '@angular/core';
import { RubricDo, QuizDto } from '../../../donnee/quiz';
import { QuizCudApplicatifServiceACI } from '../../../service-applicatif/quiz-admin';
import { ToastService } from '../../../commun/service/toaster.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  colorCss: string;
  newQuiz = new QuizDto();
  rubrics: Array<RubricDo> = [];
  typeQuestionDefault = 'Nominatif';
  typeQuestions = [
    { type: 'Nominatif', value: false },
    { type: 'Anonyme', value: true }
  ];
  savingLoad = false;

  constructor(
    private quizCudApplicatifService: QuizCudApplicatifServiceACI,
    private toastService: ToastService
  ) {}

  ngOnInit() {}

  transferRubricSuccess($event: any) {
    this.rubrics.push($event && $event.dragData);
  }

  changeColor(color: string): void {
    this.colorCss = color;
  }

  saveQuiz(): void {
    this.savingLoad = true;
    this.quizCudApplicatifService.createQuiz(this.newQuiz).subscribe(
      res => {
        if (res && res.success) {
          this.savingLoad = false;
          this.newQuiz = new QuizDto();
          this.toastService.showToast(
            res.message,
            this.toastService.typeToast.success
          );
        }
      },
      err => {
        this.savingLoad = false;
      }
    );
  }
}
