import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizFrontApplicatifServiceACI } from '../../../service-applicatif/quiz-front';
import { QuizDto, RubricDto } from '../../../donnee/quiz';

@Component({
  selector: 'app-quiz-correction',
  templateUrl: './quiz-correction.component.html',
  styleUrls: ['./quiz-correction.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QuizCorrectionComponent implements OnInit {
  isCollapsed: Array<boolean> = [];
  loading = false;
  menu: any;
  quiz: QuizDto;

  constructor(
    private route: ActivatedRoute,
    private quizFrontService: QuizFrontApplicatifServiceACI
  ) {}

  ngOnInit() {
    document.documentElement.style.setProperty('--my-var', '#FC6100');
    this.route.params.subscribe(
      param => param['id'] && this.getQuizCorrection(param['id'])
    );
  }

  getQuizCorrection(id: any): void {
    this.loading = true;
    this.quizFrontService.getQuizCorrection(id).subscribe(
      res => {
        this.loading = false;
        this.quiz = res;
        document.documentElement.style.setProperty(
          '--my-var',
          this.quiz.basic_color ? this.quiz.basic_color : '#FC6100'
        );
        this.quiz.rubriques.forEach((rubric: RubricDto) => {
          rubric.meta_contents.forEach(meta => {
            meta.type_content = 'metaContent';
          });
          rubric.questions.forEach(meta => {
            meta.type_content = 'question';
          });
          rubric.contents_rubriques = [
            ...rubric.meta_contents,
            ...rubric.questions
          ].sort((a, b) => {
            return a.poids - b.poids;
          });
        });
      },
      err => {
        console.log(err);
      }
    );
  }
}
