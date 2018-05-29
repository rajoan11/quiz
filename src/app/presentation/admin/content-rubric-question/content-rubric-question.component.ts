import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ResponseOption } from '../../../donnee/quiz';
import { QuizReadApplicatifServiceACI } from '../../../service-applicatif/quiz-admin';

@Component({
  selector: 'app-content-rubric-question',
  templateUrl: './content-rubric-question.component.html',
  styleUrls: ['./content-rubric-question.component.css']
})
export class ContentRubricQuestionComponent implements OnInit {
  @Input() colorCss: string;
  contraintes: Array<any>;
  contrainteValue = 'text';
  endValue: string;
  initialValue: string;
  @Input() index;
  @Output() deleteIndex: EventEmitter<number> = new EventEmitter<number>();
  listArrayLinear: Array<any>;
  operator = [];
  _questionQuiz: any;
  secondArray: Array<number>;
  textLength: Array<number>;
  constructor(
    private quizReadApplicatifServiceACI: QuizReadApplicatifServiceACI
  ) {}

  ngOnInit() {
    this.textLength = Array.from(Array(50).keys(), n => n + 1);
    this.secondArray = Array.from(Array(11).keys(), n => n + 0);
    this.getContraintes();
  }

  getContraintes(): void {
    this.quizReadApplicatifServiceACI.getContraintes().subscribe(res => {
      this.contraintes = res;
      console.log(res);
    });
  }

  @Input()
  set questionQuiz(value: any) {
    console.log('value', value);
    this._questionQuiz = value;
  }

  get questionQuiz(): any {
    return this._questionQuiz;
  }
  deleteContent(index: number): void {
    this.deleteIndex.emit(index);
  }

  addOptionMs(quizQuestion: any, quizQuestionSelect: any, index: number): void {
    if (quizQuestion && quizQuestion.length === index + 1) {
      quizQuestionSelect.name = `option ${index + 1}`;
      quizQuestionSelect.placeholder = `option ${index + 1}`;
      const quest = new ResponseOption();
      quest.placeholder = `Ajouter option ou AJOUTER AUTRE`;
      quizQuestion.push(quest);
    }
  }
  deleteteOptionMs(quizQuestion, index: number): void {
    quizQuestion.forEach((qz, indexation) => {
      if (quizQuestion && quizQuestion.length > 1 && indexation === index) {
        quizQuestion.splice(index, 1);
      }
    });
  }

  changeContrainteType($event): void {
    this.contraintes.forEach(contrainte => {
      if (contrainte.type_value === $event.value) {
        this.operator = contrainte.operator;
      }
    });
  }
  changeValidationOperator($event): void {
    this.operator.forEach(contrainte => {
      if (contrainte.validation_operator === $event.value) {
        this.contrainteValue = contrainte.constraint_value;
      }
    });
  }
  changeInitialType($event): void {
    let lengtharray = 10;
    parseInt($event.value, null) === 0
      ? (lengtharray = 11)
      : (lengtharray = 10);
    this.secondArray = Array.from(
      Array(lengtharray).keys(),
      n => n + parseInt($event.value, null)
    );
  }

  changefinalType($event): void {
    this.listArrayLinear = Array.from(Array(10).keys());
    let lengtharray = 10;
    parseInt($event.value, null) === 0
      ? (lengtharray =
          parseInt(this.endValue, null) - parseInt(this.initialValue, null) + 2)
      : (lengtharray =
          parseInt(this.endValue, null) -
          parseInt(this.initialValue, null) +
          1);
    this.listArrayLinear = Array.from(
      Array(lengtharray).keys(),
      n => n + parseInt(this.initialValue, null)
    );
  }
}
