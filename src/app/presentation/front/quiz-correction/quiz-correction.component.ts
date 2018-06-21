import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizFrontApplicatifServiceACI } from '../../../service-applicatif/quiz-front';
import { QuizDto, RubricDto } from '../../../donnee/quiz';
import { ToastService } from '../../../commun/service/toaster.service';

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
    private toastService: ToastService,
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
        this.toastService.showToast(
          (err && err.message) || 'erreur serveur',
          this.toastService.typeToast.error
        );
      }
    );
  }
  getScoreRubrique(rubric: RubricDto): number {
    let scoreMax = 0;
    rubric.contents_rubriques.forEach(question => {
      if (question.type_content === 'question') {
        if (question.type_question.slug === 'multiple_choice') {
          const max = Math.max.apply(
            Math,
            question.response_options.map(o => {
              return o.points ? o.points : 0;
            })
          );
          scoreMax = Number(scoreMax) + Number(max > 0 ? max : 0);
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
          scoreMax = Number(scoreMax) + Number(score2);
        }
        if (question.type_question.slug === 'list_scroll') {
          const max = Math.max.apply(
            Math,
            question.response_options.map(o => {
              return o.points ? o.points : 0;
            })
          );
          scoreMax = Number(scoreMax) + Number(max > 0 ? max : 0);
        }
      }
    });
    return scoreMax;
  }

  getScoreClient(quiz: QuizDto): number {
    let scorec = 0;
    scorec = quiz.rubriques.reduce((acc, curr) => {
      return acc + curr.score;
    }, 0);

    return scorec;
  }

  getAllScoreRubrique(quiz: QuizDto): number {
    let allscore = 0;
    quiz.rubriques.forEach((rubric: RubricDto) => {
      allscore = allscore + this.getScoreRubrique(rubric);
    });

    return allscore;
  }

  getStrLength(str: string): boolean {
    return str.length > 60 ? true : false;
  }
  getStrLength2(str: string): boolean {
    return str.length > 39 ? true : false;
  }
}
