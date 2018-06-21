import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { QuizzPatch, QuizDto } from '../../../donnee/quiz';
import { QuizCudApplicatifServiceACI } from '../../../service-applicatif/quiz-admin';

@Component({
  selector: 'app-finish-quizz',
  templateUrl: './finish-quizz.component.html',
  styleUrls: [
    './finish-quizz.component.css',
    '../create-quiz/create-quiz.component.css'
  ]
})
export class FinishQuizzComponent implements OnInit {
  @Input() finishQuizzId: number;
  @Input() finishQuizzUidQuizz: number;
  loadinFinish = false;
  _quizzStateAnonyme: boolean;
  quizzPatch = new QuizzPatch();
  @Input() newQuizz: QuizDto;

  constructor(
    private quizCudApplicatifServiceACI: QuizCudApplicatifServiceACI,
    private router: Router
  ) {}

  ngOnInit() {
    this.quizzPatch.ending_message = this.newQuizz.ending_message;
    this.quizzPatch.title_ending_message = this.newQuizz.title_ending_message
      ? this.newQuizz.title_ending_message
      : `Merci d'avoir répondu au quizz`;
    this.quizzPatch.read_score = this.newQuizz.read_score;
    this.quizzPatch.show_answer = this.newQuizz.show_answer;
    this.quizzPatch.initialize_quizz = this.newQuizz.initialize_quizz;
    this.quizzPatch.id = this.finishQuizzId;
  }

  @Input()
  set quizzStateAnonyme(value: boolean) {
    this._quizzStateAnonyme = value;
    if (value) {
      this.quizzPatch.initialize_quizz = true;
    }
  }

  finishQuizz(withvue?: boolean): void {
    this.loadinFinish = true;
    this.quizCudApplicatifServiceACI.finishQuizz(this.quizzPatch).subscribe(
      res => {
        if (res) {
          this.loadinFinish = false;
          this.newQuizz = new QuizDto();
          if (withvue) {
            this.router.navigate(['/front/resp', this.finishQuizzUidQuizz]);
          } else {
            this.router.navigate(['/admin/list']);
          }
        }
      },
      error => {
        this.loadinFinish = false;
      }
    );
  }
}
