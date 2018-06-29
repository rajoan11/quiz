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
  contraintesForLong: Array<any>;
  contrainteValue = 'numérique';
  contrainteValuelong = 'numérique';
  endValue = 5;
  firtsArray: Array<number>;
  fontawesomes: Array<any>;
  initialValue = 0;
  isSelectedRedirection: any;
  @Input() index;
  @Output() deleteIndex: EventEmitter<number> = new EventEmitter<number>();
  listArrayLinear: Array<any>;
  listScore: Array<any>;
  modalRef: BsModalRef;
  @Input() newRubrique: RubricDto;
  operator = [];
  operatorForLong = [];
  othersOptionExist = false;
  @Input() position;
  @Output()
  pointRedirectionActive: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickCorrection: EventEmitter<{}> = new EventEmitter<{}>();
  _questionQuiz: any;
  response_options: Array<any>;
  secondArray: Array<number>;
  showAddOption = false;
  textLength: Array<number>;
  value1: number;
  value2: number;
  @ViewChild('nameselected') vc: ElementRef;
  constructor(
    private quizReadApplicatifServiceACI: QuizReadApplicatifServiceACI,
    private modalService: BsModalService,
    private rubriqueService: RubriqueService
  ) {}

  ngOnInit() {
    this.textLength = Array.from(Array(50).keys(), n => n + 1);
    this.secondArray = Array.from(Array(11).keys(), n => n + 0);
    this.firtsArray = [0, 1];
    this.operator = [
      {
        validation_operator: 'Supérieur à',
        constraint_value: 'numérique'
      },
      {
        validation_operator: 'Supérieur ou égal à',
        constraint_value: 'numérique'
      },
      {
        validation_operator: 'Inférieur à',
        constraint_value: 'numérique'
      },
      {
        validation_operator: 'Inférieur ou égal à',
        constraint_value: 'numérique'
      },
      {
        validation_operator: 'Egal à',
        constraint_value: 'numérique'
      },
      {
        validation_operator: 'Différent de',
        constraint_value: 'numérique'
      },
      {
        validation_operator: 'Entre',
        constraint_value: 'numérique'
      },
      {
        validation_operator: 'Non compris entre',
        constraint_value: 'numérique'
      },
      {
        validation_operator: 'Est le nombre',
        constraint_value: 'numérique'
      },
      {
        validation_operator: 'Nombre entier',
        constraint_value: 'numérique'
      }
    ];
    this.operatorForLong = [
      {
        validation_operator: 'Nombre de caractères maximal',
        constraint_value: 'numérique'
      },
      {
        validation_operator: 'Nombre de caractères minimal',
        constraint_value: 'numérique'
      }
    ];
    this.listScore = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
    this.getContraintes();
    this.getFontawesomes();
    this.getAllRubrique();
  }

  @Input()
  set isUpdateQuizz(isupdate: boolean) {
    isupdate ? (this.showAddOption = true) : (this.showAddOption = false);
  }

  functionUpdate(): void {
    this.newRubrique.questions.forEach(quest => {
      if (quest.constraint && this.contraintes) {
        quest.type_question.slug === 'short_answer'
          ? this.changeContrainteType(
              { value: quest.constraint.type_validation },
              quest.constraint
            )
          : this.changeContrainteType2(
              { value: quest.constraint.type_validation },
              quest.constraint
            );
        this.changeValidationOperator({
          value: quest.constraint.validation_operator
        });
      }
    });
  }
  getAllRubrique() {
    this.rubriqueService.getRubrique().subscribe(rubriques => {
      this.allSections = [];
      this.allSections.push({
        name: 'Passer à la section suivante',
        value: false
      });
      if (rubriques && rubriques.length > 0) {
        rubriques.forEach((rs, index) => {
          const data = {
            name: rs.name
              ? `Passer à la section ${rs.name} (${index + 1}/${
                  rubriques.length
                })`
              : `Passer à la section ${index + 1} (${index + 1}/${
                  rubriques.length
                })`,
            value: index + 1
          };
          if (this.position !== index) {
            this.allSections.push(data);
          }
        });
      }
      this.allSections.push({
        name: 'Envoyer le formulaire',
        value: 0
      });
    });
  }

  getContraintes(): void {
    this.quizReadApplicatifServiceACI.getContraintes().subscribe(res => {
      this.contraintes = res;
      if (this.showAddOption) {
        this.functionUpdate();
      }
      this.contraintesForLong = res.filter(resp => {
        return resp.type_value !== 'number' && resp.type_value !== 'Text';
      });
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
    this._questionQuiz = value;
  }

  get questionQuiz(): any {
    return this._questionQuiz;
  }
  deleteContent(index: number): void {
    this.deleteIndex.emit(index);
  }
  addOptionMsAutre(): void {}

  addOptionMs(quizQuestion: any, others?: any, $event?: any): void {
    const quest = new ResponseOption();
    quest.name = `Autres`;
    quest.placeholder = `Autres`;
    quest.slug = 'autres';
    quest.points = 0;
    if (others) {
      quizQuestion.push(quest);
      this.othersOptionExist = true;
    } else {
      const max1 = Math.max.apply(
        Math,
        quizQuestion.map(o => {
          return o.slug !== 'autres' && o.slug.split('option')[1];
        })
      );
      const quest1 = new ResponseOption();
      quest1.name = `option ${quizQuestion.length + 1}`;
      quest1.placeholder = `option ${quizQuestion.length + 1}`;
      quest1.slug = `option${max1 + 1}`;
      quest1.points = 0;
      quizQuestion.push(quest1);

      quizQuestion.forEach((qz, index) => {
        if (qz.slug === 'autres') {
          quizQuestion.splice(index, 1);
        }
      });

      if (this.othersOptionExist) {
        quizQuestion.push(quest);
      }
      this.vc.nativeElement.focus();
      this.vc.nativeElement.select();
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
  deleteteOptionMs(quizQuestion, index: number, isLinear?: boolean): void {
    const limit = isLinear ? 2 : 1;
    quizQuestion.forEach((qz, indexation) => {
      if (quizQuestion && quizQuestion.length > limit && indexation === index) {
        quizQuestion.splice(index, 1);
      }
    });
    if (quizQuestion.find(qz1 => qz1.slug === 'autres')) {
      this.othersOptionExist = true;
    } else {
      this.othersOptionExist = false;
    }
  }

  changeContrainteType($event, type_validation?): void {
    this.contraintes.forEach(contrainte => {
      if (contrainte.type_value === $event.value) {
        this.operator = contrainte.operator;
        type_validation.validation_operator = this.operator[0].validation_operator;
      }
    });
  }
  changeContrainteType2($event, type_validation?): void {
    this.contraintes.forEach(contrainte => {
      if (contrainte.type_value === $event.value) {
        this.operatorForLong = contrainte.operator;
        type_validation.validation_operator = this.operatorForLong[0].validation_operator;
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
  changeValidationOperatorLong($event): void {
    this.operatorForLong.forEach(contrainte => {
      if (contrainte.validation_operator === $event.value) {
        this.contrainteValuelong = contrainte.constraint_value;
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
      questionQuiz1.response_options.forEach((q1, index) => {
        index === 0
          ? (q1.name = 'minimum')
          : index + 1 === questionQuiz1.response_options.length
            ? (q1.name = 'maximum')
            : (q1.name = '');
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

      questionQuiz1.response_options.forEach((q1, index) => {
        index === 0
          ? (q1.name = 'minimum')
          : index + 1 === questionQuiz1.response_options.length
            ? (q1.name = 'maximum')
            : (q1.name = '');
      });
    }
  }

  toNumber(value) {
    return parseInt(value, null);
  }

  openModal(template: TemplateRef<any>, fa) {
    if (fa !== 'smiley' && fa !== 'point' && fa !== 'coeur') {
      this.modalRef = this.modalService.show(template);
    } else {
      this._questionQuiz.keysmiley = null;
    }
  }
  faValue(value: string, key): void {
    this._questionQuiz.keysmiley = key;
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
    actionTarget.rubrique_target_poids === 0
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
      }
      if (!this._questionQuiz.response_redirection) {
        question.response_redirection_exist = false;
      }
    });
    this.getAllRubrique();
  }

  checkIsredirect(_questionQuiz) {
    const detect = this.newRubrique.contents_rubriques.filter(
      (quest, index) => {
        if (quest.response_redirection && index !== this.index) {
          _questionQuiz.response_redirection_exist = true;
          _questionQuiz.response_redirection_text = quest.description
            ? quest.description
            : `question ${index + 1}`;
        }
      }
    );
  }

  correction(status, i) {
    this.clickCorrection.emit({
      status: status,
      index: i,
      position: this.position
    });
  }

  checkDoublon(event: any, responseOption: any, options: Array<any>): void {
    const doublonExist = options.find(item => item['name'] === event.target.value && item.slug !== responseOption.slug);
    if (doublonExist) {
      responseOption['name'] = '';
    }
  }
}
