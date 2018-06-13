import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { QuizzPatch } from '../../../donnee/quiz';
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
  loadinFinish = false;
  _quizzStateAnonyme: boolean;
  quizzPatch = new QuizzPatch();

  constructor(
    private quizCudApplicatifServiceACI: QuizCudApplicatifServiceACI,
    private router: Router
  ) {}

  ngOnInit() {
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
          if (withvue) {
            this.router.navigate(['/front/resp', this.finishQuizzId]);
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
