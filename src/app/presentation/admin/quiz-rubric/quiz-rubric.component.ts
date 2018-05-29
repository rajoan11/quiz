import { Component, OnInit, Input, TemplateRef } from '@angular/core';
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
  modalRef: BsModalRef;
  questionQuizs: Array<any> = [];
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
      Object.assign({}, { class: 'rubric-pops' })
    );
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
    this.arrayScore1 = Array.from(Array(50).keys(), n => n + 1);
    this.arrayScore2 = Array.from(Array(50).keys(), n => n + 1);
  }

  addTo($event: any) {
    this.questionService.setQuestionChange(true);
  }

  activatePointRule(): void {
    this.newRubrique.activate_points_rules = !this.newRubrique
      .activate_points_rules;
    this.newRubrique.points_rules.push(new PointsRules());
  }

  onDeleteIndex(event: any): void {
    console.log(event);
    console.log(this.newRubrique.contents_rubriques);
    this.newRubrique.contents_rubriques.forEach((cr, index) => {
      if (index === event) {
        this.newRubrique.contents_rubriques.splice(index, 1);
      }
    });
  }
}
