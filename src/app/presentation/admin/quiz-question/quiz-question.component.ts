import { Component, OnInit } from '@angular/core';
import { QuizReadApplicatifServiceACI } from '../../../service-applicatif/quiz-admin';
import { RubricDto } from '../../../donnee/quiz';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.scss']
})
export class QuizQuestionComponent implements OnInit {
  panelOpenState: boolean;
  transferData: Object = { id: 1, msg: 'Hello' };
  rubric = new RubricDto();

  questions = [];
  constructor(
    private quizReadApplicatifServiceACI: QuizReadApplicatifServiceACI
  ) {}

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions(): void {
    this.quizReadApplicatifServiceACI.getQuestion().subscribe(res => {
      this.questions = res;
    });
  }
}
