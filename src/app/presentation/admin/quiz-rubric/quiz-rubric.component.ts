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
  PointsRules
} from '../../../donnee/quiz';
import { QuestionService } from '../../../commun/service/question.service';

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
  modalRef: BsModalRef;
  modalRefDelete: BsModalRef;
  pointRedirectionActiveExist = false;
  questionQuizs: Array<any> = [];
  scoreMax = 50;
  typeAttachement: string;

  @Input() newRubrique: RubricDto;
  @Input() position: number;
  quizLengthValue: number;
  constructor(
    private modalService: BsModalService,
    private questionService: QuestionService
  ) {}

  openModal(template: TemplateRef<any>) {
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
    this.newRubrique.points_rules = [];
    this.newRubrique.points_rules.push(new PointsRules());
  }

  ngOnInit() {
    this.getLengthOfQuizz();
  }

  @Input()
  set quizLength(value: any) {
    this.quizLengthValue = value;
    this.getLengthOfQuizz();
  }

  getLengthOfQuizz(): void {
    this.arrayQuiz = Array.from(Array(this.quizLengthValue).keys(), n => n + 1);
    this.arrayScore1 = Array.from(Array(this.scoreMax).keys(), n => n + 1);
    this.arrayScore2 = Array.from(Array(this.scoreMax).keys(), n => n + 1);
  }

  addTo($event: any) {
    this.questionService.setQuestionChange(true);
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
    this.pointRedirectionActiveExist = $event;
  }
}
