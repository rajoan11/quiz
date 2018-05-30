import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  TemplateRef
} from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

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
  fontawesomes: Array<any>;
  initialValue: string;
  @Input() index;
  @Output() deleteIndex: EventEmitter<number> = new EventEmitter<number>();
  listArrayLinear: Array<any>;
  modalRef: BsModalRef;
  operator = [];
  _questionQuiz: any;
  response_options: Array<any>;
  secondArray: Array<number>;
  textLength: Array<number>;
  constructor(
    private quizReadApplicatifServiceACI: QuizReadApplicatifServiceACI,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.textLength = Array.from(Array(50).keys(), n => n + 1);
    this.secondArray = Array.from(Array(11).keys(), n => n + 0);
    this.getContraintes();
    this.getFontawesomes();
  }

  getContraintes(): void {
    this.quizReadApplicatifServiceACI.getContraintes().subscribe(res => {
      this.contraintes = res;
    });
  }
  getFontawesomes(): void {
    this.quizReadApplicatifServiceACI.getFontawesomes().subscribe(res => {
      this.fontawesomes = Object.entries(res).reduce((acc, curr) => {
        const a = { key: curr[0], value: curr[1] };
        acc.push(a);
        return acc;
      }, []);
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
  changeInitialType($event, questionQuiz1): void {
    let length = 10;
    parseInt($event.value, null) === 0 ? (length = 11) : (length = 10);
    this.secondArray = Array.from(
      Array(length).keys(),
      n => n + parseInt($event.value, null)
    );

    if (this.endValue) {
      questionQuiz1.response_options = [];
      Array.from(
        Array(
          this.toNumber(this.endValue) - this.toNumber($event.value) + 1
        ).keys(),
        n => n + parseInt($event.value, null)
      ).forEach((arr, index) => {
        questionQuiz1.response_options.push({
          name: '',
          poids: index,
          slug: null
        });
      });
    }
  }

  changefinalType($event, questionQuiz1): void {
    if (this.initialValue) {
      questionQuiz1.response_options = [];
      Array.from(
        Array(
          this.toNumber($event.value) - this.toNumber(this.initialValue) + 1
        ).keys(),
        n => n + parseInt($event.value, null)
      ).forEach((arr, index) => {
        questionQuiz1.response_options.push({
          name: '',
          poids: index,
          slug: null
        });
      });
    }
  }

  toNumber(value) {
    return parseInt(value, null);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  faValue(value: string): void {}
}
