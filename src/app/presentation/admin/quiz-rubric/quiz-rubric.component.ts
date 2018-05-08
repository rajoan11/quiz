import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-rubric',
  templateUrl: './quiz-rubric.component.html',
  styleUrls: ['./quiz-rubric.component.css']
})
export class QuizRubricComponent implements OnInit {
  contentQuizs: Array<any> = [];
  typeAttachement: string;
  constructor() {}

  ngOnInit() {}

  transferDataSuccess($event: any) {
    this.typeAttachement = $event.dragData;
    this.contentQuizs.push($event.dragData);
  }
}
