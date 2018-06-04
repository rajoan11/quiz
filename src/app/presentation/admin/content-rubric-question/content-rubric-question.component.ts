import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  TemplateRef,
  ViewChild,
  ElementRef
} from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ResponseOption, RubricDto } from '../../../donnee/quiz';
import { QuizReadApplicatifServiceACI } from '../../../service-applicatif/quiz-admin';
import { RubriqueService } from '../../../commun/service/rubrique.service';

@Component({
  selector: 'app-content-rubric-question',
  templateUrl: './content-rubric-question.component.html',
  styleUrls: ['./content-rubric-question.component.css']
})
export class ContentRubricQuestionComponent implements OnInit {
  allSections: Array<any> = [];
  @Input() colorCss: string;
  contraintes: Array<any>;
  contrainteValue = 'text';
  endValue: string;
  fontawesomes: Array<any>;
  initialValue: string;
  @Input() index;
  @Output() deleteIndex: EventEmitter<number> = new EventEmitter<number>();
  listArrayLinear: Array<any>;
  listScore = ['-5', '-4', '-3', '-2', '-1', '0', '1', '2', '3', '4', '5'];
  modalRef: BsModalRef;
  @Input() newRubrique: RubricDto;
  operator = [];
  othersOptionExist = false;
  @Output()
  pointRedirectionActive: EventEmitter<boolean> = new EventEmitter<boolean>();
  _questionQuiz: any;
  response_options: Array<any>;
  secondArray: Array<number>;
  showAddOption = false;
  textLength: Array<number>;
  value1: number;
  value2: number;
  @ViewChild('name') vc: ElementRef;
  constructor(
    private quizReadApplicatifServiceACI: QuizReadApplicatifServiceACI,
    private modalService: BsModalService,
    private rubriqueService: RubriqueService
  ) {}

  ngOnInit() {
    this.textLength = Array.from(Array(50).keys(), n => n + 1);
    this.secondArray = Array.from(Array(11).keys(), n => n + 0);
    this.getContraintes();
    this.getFontawesomes();
    this.getAllRubrique();
  }
  getAllRubrique() {
    this.rubriqueService.getRubrique().subscribe(rubriques => {
      this.allSections = [];
      this.allSections.push({
        name: 'Passer à la section suivante',
        value: false
      });
      rubriques.forEach((rs, index) => {
        const data = {
          name: rs.name
            ? `Passer à la section ${rs.name}`
            : `Passer à la section ${index + 1}`,
          value: index + 1
        };
        this.allSections.push(data);
      });
      this.allSections.push({
        name: 'Envoyer le formulaire',
        value: 'null'
      });
    });
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
  addOptionMsAutre(): void {}

  addOptionMs(quizQuestion: any, others?: any): void {
    if (others) {
      const quest = new ResponseOption();
      quest.name = `Autres`;
      quest.placeholder = `Autres`;
      quest.slug = 'autres';
      quizQuestion.push(quest);
      this.othersOptionExist = true;
    } else {
      const quest1 = new ResponseOption();
      quest1.name = `option ${quizQuestion.length + 1}`;
      quest1.placeholder = `option ${quizQuestion.length + 1}`;
      quizQuestion.push(quest1);
      setTimeout(() => {
        this.vc.nativeElement.focus();
      }, 100);
      const quest = new ResponseOption();
      quest.name = `Autres`;
      quest.placeholder = `Autres`;
      quest.slug = 'autres';
      quizQuestion.forEach((qz, index) => {
        if (qz.slug === 'autres') {
          quizQuestion.splice(index, 1);
        } else {
          qz.slug = `option${index}`;
        }
      });
      if (this.othersOptionExist) {
        quizQuestion.push(quest);
      }

      console.log(quizQuestion);
    }
  }
  addOptionMsFirst(
    quizQuestion: any,
    quizQuestionSelect: any,
    index: number
  ): void {
    if (quizQuestion && quizQuestion.length === 1) {
      this.showAddOption = true;
    }
  }
  deleteteOptionMs(quizQuestion, index: number): void {
    quizQuestion.forEach((qz, indexation) => {
      if (quizQuestion && quizQuestion.length > 1 && indexation === index) {
        quizQuestion.splice(index, 1);
      }
    });
    if (quizQuestion.find(qz1 => qz1.slug === 'autres')) {
      this.othersOptionExist = true;
    } else {
      this.othersOptionExist = false;
    }
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
  faValue(value: string): void {
    this._questionQuiz.smiley = value;
    this.modalRef.hide();
  }

  changeNumberOne($event, number, constraint): void {
    number === 1
      ? (constraint.constraint_value = `${$event}-${
          this.value2 ? this.value2 : 0
        }`)
      : (constraint.constraint_value = `${
          this.value1 ? this.value1 : 0
        }-${$event}`);
  }
  changeTargetSection(actionTarget): void {
    actionTarget.rubrique_target_poids ||
    actionTarget.rubrique_target_poids === 'null'
      ? (actionTarget.has_rule_direction = true)
      : (actionTarget.has_rule_direction = false);
  }
  activateRedirection(response_redirection): void {
    this._questionQuiz.response_redirection = !response_redirection;
    this._questionQuiz.response_redirection
      ? this.pointRedirectionActive.emit(true)
      : this.pointRedirectionActive.emit(false);
    const name = this._questionQuiz.description
      ? this._questionQuiz.description
      : `question `;

    this.newRubrique.contents_rubriques.forEach((question, index) => {
      if (question.type_content === 'question') {
        question.question_is_selected = name;
        !this._questionQuiz.response_redirection
          ? (question.is_response_redirection = true)
          : question.response_redirection
            ? this.setAttributeQuestion(question, index)
            : (question.is_response_redirection = false);
      }
    });
  }

  setAttributeQuestion(question, index) {
    question.is_response_redirection = true;
  }
}
