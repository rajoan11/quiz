import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizCudApplicatifServiceACI } from '../../../service-applicatif/quiz-admin';
import { ResultatApplicatifServiceACI } from '../../../service-applicatif/resultat';
import { QuizStatDto, QuizzPatch } from '../../../donnee/quiz';

import {QuizFrontApplicatifServiceACI} from '../../../service-applicatif/quiz-front';

@Component({
  selector: 'app-quiz-apercu',
  templateUrl: './quiz-apercu.component.html',
  styleUrls: ['./quiz-apercu.component.css']
})
export class QuizApercuComponent implements OnInit {
  activeUserId: number;
  loading = false;
  loadingRemoveUser = false;
  loadingUsers = false;
  quiz = new QuizStatDto();
  quizPatch = new QuizzPatch();
  users = new Array<any>();

  constructor(
    private quizService: QuizCudApplicatifServiceACI,
    private resultatService: ResultatApplicatifServiceACI,
    private route: ActivatedRoute,

    private quizFrontService: QuizFrontApplicatifServiceACI
  ) {}

  ngOnInit() {
    document.documentElement.style.setProperty('--my-var', '#FC6100');
    this.route.params.subscribe(param => this.getUsers(param['id']));
  }

  getUsers(idQuiz: any): void {
    this.loadingUsers = true;
    this.resultatService.getUsers(idQuiz).subscribe(
      res => {
        this.users = res;
        this.activeUserId = this.users[0]['id'];
        this.getQuizCorrection(idQuiz);
        this.loadingUsers = false;
      },
      err => {
        this.loadingUsers = false;
      }
    );

  }

  getQuizCorrection(id: number): void {
    this.loading = true;
    // this.resultatService.getQuizStats(id).subscribe(
    this.quizFrontService.getQuizCorrection('347cd1c2ac9959dc9a85226404d8a58f38cf7acb03e070e74474694dd18b3de4').subscribe(
      res => {
        this.quiz = res;
        this.formatQuizPatch();
        this.formatSmiley();
        this.loading = false;
      },
      err => {
        this.loading = false;
      }
    );
  }

  formatQuizPatch(): void {
    const keysPatch = ['id', 'disabled_response_message', 'accept_reponse'];
    keysPatch.forEach(key => {
      if (this.quiz.hasOwnProperty(key)) {
        this.quizPatch[key] = this.quiz[key];
      }
    });
  }

  changeQuizPatch(): void {
    this.quizService.finishQuizz(this.quizPatch).subscribe(
      res => { },
      err => { }
    );
  }

  changeUser(currentUser: any): void {
    this.activeUserId = currentUser.id;
    this.getQuizCorrection(currentUser.idQuiz);
  }

  formatSmiley(): void {
    this.quiz.rubriques.forEach(rubrique => {
      rubrique.questions.forEach(question => {
        if (question.type_question.slug === 'lineary_scale' && question.smiley) {
          if (question.smiley === 'smiley') {
            question.content = String.fromCharCode(0xf118);
          } else if (question.smiley === 'coeur') {
            question.content = String.fromCharCode(0xf004);
          } else {
            question.content = String.fromCharCode(
              parseInt('0x' + question.smiley, 16)
            );
          }
        }
      });
    });
  }

  findReponse(response_inputs, optionSlug): boolean {
    return response_inputs.find(e => e.value_input === optionSlug);
  }

  getQuestionUserScore(question: any): number {
    let score = 0;
    if (question.response_inputs) {
      question.response_inputs.forEach(({ value_input, is_texte }) => {
        const responseTarget = question.response_options.find(
          ({ slug, points }) => slug === value_input
        );
        if (responseTarget) {
          score += responseTarget['points'] || 0;
        } else {
          const otherResponseTarget = question.response_options.find(
            ({ slug, points }) => slug === 'autres'
          );
          if (otherResponseTarget) {
            score += otherResponseTarget['points'] || 0;
          }
        }
      });
    }
    return score;
  }

  getQuestionTargetScore(question: any): number {
    let score = 0;
    if (
      question.type_question.slug === 'multiple_choice' ||
      question.type_question.slug === 'list_scroll'
    ) {
      if (question.response_options) {
        score = question.response_options
          .map(response => response['points'])
          .filter(point => point > 0)
          .reduce((val, acc) => (val > acc ? val : acc), 0);
      }
    }
    if (question.type_question.slug === 'checkbox') {
      if (question.response_options) {
        question.response_options.forEach(({ points }) => {
          if (points > 0) {
            score += points;
          }
        });
      }
    }
    return score;
  }

  getRubricTargetScore(rubrique: any): number {
    let score = 0;
    rubrique.questions.forEach(question => {
      score += this.getQuestionTargetScore(question);
    });
    return score;
  }

  removeUser(user: any): void {
    this.loadingRemoveUser = true;
    this.resultatService.removeUser(user.id, this.quiz.id).subscribe(
      res => {
        this.loadingRemoveUser = false;
        this.getUsers(this.quiz.id);
      },
      err => {
        this.loadingRemoveUser = false;
      }
    );
  }
}
