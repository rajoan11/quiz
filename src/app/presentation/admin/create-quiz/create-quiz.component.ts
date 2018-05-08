import { Component, OnInit } from '@angular/core';
import { RubricDo } from '../../../donnee/quiz';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  rubrics: Array<RubricDo> = [];
  constructor() {}

  ngOnInit() {}

  transferRubricSuccess($event: any) {
    this.rubrics.push($event && $event.dragData);
  }
}
