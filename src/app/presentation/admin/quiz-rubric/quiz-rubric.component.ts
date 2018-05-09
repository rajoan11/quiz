import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quiz-rubric',
  templateUrl: './quiz-rubric.component.html',
  styleUrls: ['./quiz-rubric.component.css']
})
export class QuizRubricComponent implements OnInit {
  contentQuizs: Array<any> = [];
  questionQuizs: Array<any> = [];
  typeAttachement: string;
  @Input() quizLength: number;
  @Input() position: number;
  constructor() {}

  ngOnInit() {}

  transferDataSuccess($event: any) {
    this.typeAttachement = $event.dragData;
    this.contentQuizs.push($event.dragData);
  }
  transferQuestionSuccess($event: any) {
    this.typeAttachement = $event.dragData;
    this.questionQuizs.push($event.dragData);
  }
}
