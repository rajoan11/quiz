import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quizz-correction-question',
  templateUrl: './quizz-correction-question.component.html',
  styleUrls: ['./quizz-correction-question.component.css']
})
export class QuizzCorrectionQuestionComponent implements OnInit {
  @Input() question: any;

  constructor() {}

  ngOnInit() {}

  findReponse(response_inputs, reponOptionslug): boolean {
    return response_inputs.find(e => e.value_input === reponOptionslug);
  }
  findTrueAnswer(response_options, response_inputs): boolean {
    let isAnswer = false;
    response_options.filter(e => e.correct_answer).forEach(element => {
      if (response_inputs.find(ri => ri.value_input === element.slug)) {
        isAnswer = true;
      }
    });
    return isAnswer;
  }
}
