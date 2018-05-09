import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-content-rubric',
  templateUrl: './content-rubric.component.html',
  styleUrls: ['./content-rubric.component.css']
})
export class ContentRubricComponent implements OnInit {
  @Input() contentQuiz: any;
  @Input() questionQuizs: any;
  constructor() {}

  ngOnInit() {}
}
