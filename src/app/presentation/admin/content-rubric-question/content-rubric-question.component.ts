import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-content-rubric-question',
  templateUrl: './content-rubric-question.component.html',
  styleUrls: ['./content-rubric-question.component.css']
})
export class ContentRubricQuestionComponent implements OnInit {
  _questionQuiz: any;
  constructor() {}

  ngOnInit() {}

  @Input()
  set questionQuiz(value: any) {
    console.log('value', value);
    this._questionQuiz = value;
  }

  get questionQuiz(): any {
    console.log('value2', this._questionQuiz);
    return this._questionQuiz;
  }
}
