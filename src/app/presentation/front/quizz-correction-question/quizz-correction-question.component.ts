import { Component, OnInit, Input } from '@angular/core';
import { Question, RubricDto, QuizDto } from '../../../donnee/quiz';

@Component({
  selector: 'app-quizz-correction-question',
  templateUrl: './quizz-correction-question.component.html',
  styleUrls: ['./quizz-correction-question.component.css']
})
export class QuizzCorrectionQuestionComponent implements OnInit {
  @Input() question: any;
  @Input() quiz: QuizDto;

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

  scoreQuestion(question): number {
    let score = 0;
    if (question.type_question.slug === 'multiple_choice') {
      const max = Math.max.apply(
        Math,
        question.response_options.map(o => {
          return o.points ? o.points : 0;
        })
      );
      score = Number(max);
    }
    if (question.type_question.slug === 'checkbox') {
      const score2 = parseInt(
        question.response_options.reduce((acc, curr) => {
          let somme = 0;
          curr.points > 0
            ? (somme = Number(acc) + Number(curr.points))
            : (somme = acc);
          return somme;
        }, 0),
        null
      );
      score = Number(score2);
    }
    if (question.type_question.slug === 'list_scroll') {
      const max = Math.max.apply(
        Math,
        question.response_options.map(o => {
          return o.points ? o.points : 0;
        })
      );
      score = Number(max);
    }
    return score;
  }

  scoreRes(question): number {
    let score = 0;
    if (question.type_question.slug === 'multiple_choice') {
      const score1 = parseInt(
        question.response_inputs.reduce((acc, curr) => {
          let somme = 0;
          somme = Number(acc) + Number(curr.score ? curr.score : 0);
          return somme;
        }, 0),
        null
      );
      score = Number(score) + Number(score1);
    }
    if (question.type_question.slug === 'checkbox') {
      const score3 = parseInt(
        question.response_inputs.reduce((acc, curr) => {
          let somme = 0;
          somme = Number(acc) + Number(curr.score ? curr.score : 0);
          return somme;
        }, 0),
        null
      );
      score = Number(score) + Number(score3);
    }
    if (question.type_question.slug === 'list_scroll') {
      const score2 = parseInt(
        question.response_inputs.reduce((acc, curr) => {
          let somme = 0;
          somme = Number(acc) + Number(curr.score ? curr.score : 0);
          return somme;
        }, 0),
        null
      );
      score = Number(score) + Number(score2);
    }
    return score;
  }
}
