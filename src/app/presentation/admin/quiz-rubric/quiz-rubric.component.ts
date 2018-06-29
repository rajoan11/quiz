import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  EventEmitter,
  Output
} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {
  RubricDto,
  Attachement,
  Question,
  PointsRules,
  QuizDto
} from '../../../donnee/quiz';
import { QuestionService } from '../../../commun/service/question.service';
import { RubriqueService } from '../../../commun/service/rubrique.service';

@Component({
  selector: 'app-quiz-rubric',
  templateUrl: './quiz-rubric.component.html',
  styleUrls: ['./quiz-rubric.component.css']
})
export class QuizRubricComponent implements OnInit {
  arrayQuiz: Array<number>;
  arrayScore1: Array<number>;
  arrayScore2: Array<number>;
  @Input() colorCss: string;
  contentQuizs: Array<any> = [];
  @Output() deleteRubrique: EventEmitter<number> = new EventEmitter<number>();
  @Input() hideContentRubric: boolean;
  @Input() isUpdateQuizz: boolean;
  modalRef: BsModalRef;
  modalRefDelete: BsModalRef;
  @Input() newQuiz: QuizDto;
  pointRedirectionActiveExist = false;
  questionQuizs: Array<any> = [];
  scoreMax = 0;
  typeAttachement: string;

  @Input() newRubrique: RubricDto;
  @Input() position: number;
  quizLengthValue: number;
  constructor(
    private modalService: BsModalService,
    private rubriqueService: RubriqueService
  ) {}

  openModal(template: TemplateRef<any>, index) {
    this.scoreMax = 0;
    this.newQuiz.rubriques.forEach((rubric: RubricDto) => {
      rubric.contents_rubriques.forEach(question => {
        if (question.type_content === 'question') {
          if (question.type_question.slug === 'multiple_choice') {
            const max = Math.max.apply(
              Math,
              question.response_options.map(o => {
                return o.points;
              })
            );
            this.scoreMax = Number(this.scoreMax) + Number(max > 0 ? max : 0);
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
            this.scoreMax = Number(this.scoreMax) + Number(score2);
          }
          if (question.type_question.slug === 'list_scroll') {
            const score3 = parseInt(
              question.response_options.reduce((acc, curr) => {
                let somme = 0;
                curr.points > 0
                  ? (somme = Number(acc) + Number(curr.points))
                  : (somme = acc);
                return somme;
              }, 0),
              null
            );
            this.scoreMax = Number(this.scoreMax) + Number(score3);
          }
        }
      });
    });
    this.getLengthOfQuizz(index);
    this.openModalContent(template, index);
  }

  openModalContent(template: TemplateRef<any>, index) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign(
        {},
        {
          class: 'rubric-pops',
          backdrop: true,
          ignoreBackdropClick: true
        }
      )
    );
  }
  openModalDelete(template: TemplateRef<any>) {
    this.modalRefDelete = this.modalService.show(
      template,
      Object.assign(
        {},
        {
          class: 'rubric-pops',
          backdrop: true,
          ignoreBackdropClick: true
        }
      )
    );
  }

  confirmDelete() {
    this.deleteRubrique.emit(this.position);
    this.modalRefDelete.hide();
  }
  closeModal(template: TemplateRef<any>) {
    this.modalRef.hide();
    this.newRubrique.points_rules.length === 0
      ? this.newRubrique.points_rules.push(new PointsRules())
      : (this.newRubrique.points_rules = this.newRubrique.points_rules);
  }

  ngOnInit() {
    this.getLengthOfQuizz();
  }

  @Input()
  set quizLength(value: any) {
    this.quizLengthValue = value;
    this.getLengthOfQuizz();
  }

  getLengthOfQuizz(index?: number): void {
    this.arrayQuiz = Array.from(
      Array(this.quizLengthValue).keys(),
      n => n + 1
    ).filter(arr => arr !== index);
    this.arrayScore1 = Array.from(Array(this.scoreMax).keys(), n => n + 1);
    this.arrayScore2 = Array.from(Array(this.scoreMax).keys(), n => n + 1);
  }

  activatePointRule(): void {
    this.newRubrique.activate_points_rules = !this.newRubrique
      .activate_points_rules;
    if (
      this.newRubrique.points_rules &&
      this.newRubrique.points_rules.length === 0
    ) {
      this.newRubrique.points_rules.push(new PointsRules());
    }
  }

  onDeleteIndex(event: any): void {
    this.newRubrique.contents_rubriques.forEach((cr, index) => {
      if (index === event) {
        this.newRubrique.contents_rubriques.splice(index, 1);
        this.newRubrique.contents_rubriques.length === 0
          ? (this.newRubrique.contents_rubriques = [])
          : (this.newRubrique.contents_rubriques = this.newRubrique.contents_rubriques);
      }
    });
  }
  changePoint(index, pointsRulesLength): void {
    if (index + 1 === pointsRulesLength) {
      this.newRubrique.points_rules.push(new PointsRules());
    }
  }
  deletePointRule(index, pointsRules): void {
    pointsRules.forEach((pr, i) => {
      if (i === index) {
        pointsRules.splice(index, 1);
      }
    });
  }
  pointRedirectionActive($event): void {
    setTimeout(() => (this.pointRedirectionActiveExist = $event));
  }

  nameRubricChange(): void {
    this.rubriqueService.setRubrique(this.newQuiz.rubriques);
  }

  clickCorrection($event) {
    this.newQuiz.rubriques.forEach((rubrique, index) => {
      rubrique.contents_rubriques.forEach((question, ind) => {
        $event.position === index &&
        $event.index === ind &&
        question.type_content === 'question'
          ? (question.corection = $event.status)
          : (question.corection = false);
      });
    });
  }
}
