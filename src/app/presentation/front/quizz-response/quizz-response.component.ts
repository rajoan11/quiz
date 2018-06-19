import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { QuizDto } from '../../../donnee/quiz/quiz-dto';
import { QuizFrontApplicatifServiceACI } from '../../../service-applicatif/quiz-front';
import { TextValidator, NumberValidator } from '../../../commun/validator';

@Component({
  selector: 'app-quizz-response',
  templateUrl: './quizz-response.component.html',
  styleUrls: ['./quizz-response.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QuizzResponseComponent implements OnInit {
  activeRubrique = 0;
  forms = new Array<FormGroup>();
  isCorrectionPage = false;
  loadingQuiz = false;
  showErrors = [];
  quiz = new QuizDto();

  constructor(
    private route: ActivatedRoute,
    private quizFrontService: QuizFrontApplicatifServiceACI,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    document.documentElement.style.setProperty('--my-var', '#FC6100');
    this.route.params.subscribe(param => param['id'] && this.getQuiz(param['id']));
  }

  initForm(): void {
    this.showErrors = Array.from(this.quiz.rubriques, x => false);
    this.quiz.rubriques.forEach(rubrique => {
      const form = this.createFormGroup(rubrique.questions);
      this.forms.push(form);
    });
  }

  createFormGroup(formConfig: any): FormGroup {
    const group = this.fb.group({});
    formConfig.forEach(control => {
      group.addControl('control-' + control.id, this.fb.control('', this.createControlValidators(control)));
    });
    return group;
  }

  createControlValidators(control: any): Array<any> {
    const validators = [];
    if (control.is_mandatory) {
      validators.push(Validators.required);
    }
    if (control.with_validation_contrainte) {
      switch (control.constraint.validation_operator) {
        /**TEXT VALIDATORS*/
        case 'Contient':
          validators.push(TextValidator.include(control.constraint.constraint_value)); break;
        case 'Ne contient pas':
          validators.push(TextValidator.exclude(control.constraint.constraint_value)); break;
        case 'Adresse e-mail':
          // tslint:disable-next-line:max-line-length
          validators.push(Validators.pattern(/[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)); break;
        case 'URL':
          // tslint:disable-next-line:max-line-length
          validators.push(Validators.pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)); break;
        /**NUMBER VALIDATORS*/
        case 'Supérieur à':
          validators.push(Validators.min(+control.constraint.constraint_value || 0)); break;
        case 'Inférieur à':
          validators.push(Validators.max(+control.constraint.constraint_value || 100000)); break;
        case 'Supérieur ou égal à':
          validators.push(Validators.min(+control.constraint.constraint_value - 1 || 0)); break;
        case 'Inférieur ou égal à':
          validators.push(Validators.max(+control.constraint.constraint_value + 1 || 100000)); break;
        case 'Egal à':
          validators.push(NumberValidator.equal(+control.constraint.constraint_value)); break;
        case 'Différent de':
          validators.push(NumberValidator.notEqual(+control.constraint.constraint_value)); break;
        case 'Entre':
          validators.push(NumberValidator.between(+(control.constraint.constraint_value.split('-')[0]),
            +(control.constraint.constraint_value.split('-')[1]))); break;
        case 'Nombre entier':
          validators.push(NumberValidator.integer); break;
        /**LENGTH VALIDATION */
        case 'Nombre de caractères maximal':
          validators.push(Validators.maxLength(+control.constraint.constraint_value || 50)); break;
        case 'Nombre de caractères minimal':
          validators.push(Validators.minLength(+control.constraint.constraint_value || 1)); break;
      }
    }
    return validators;
  }

  getQuiz(id: string): void {
    this.loadingQuiz = true;
    this.quizFrontService.getQuiz(id).subscribe(
      res => {
        this.loadingQuiz = false;
        this.quiz = res;
        this.orderRubricContent();
        this.initCheckBoxAnswers();
        this.initForm();
        document.documentElement.style.setProperty('--my-var',
          this.quiz.basic_color ? this.quiz.basic_color : '#FC6100');
      },
      err => {
        this.loadingQuiz = false;
        console.log(err);
      }
    );
  }

  orderRubricContent(): void {
    this.quiz.rubriques.forEach(rubrique => {
      rubrique.contents = [...rubrique.meta_contents, ...rubrique.questions].sort((a, b) => a.poids - b.poids);
    });
  }

  initCheckBoxAnswers(): void {
    this.quiz.rubriques.forEach(rubrique => {
      rubrique.questions.forEach(question => {
        switch (question.type_question.slug) {
          case 'checkbox': question.response_inputs = []; break;
          case 'multiple_choice': question.response_inputs = []; break;
          case 'list_scroll': question.response_inputs = [{value_input: null, is_texte: false}]; break;
          default: question.response_inputs = [{value_input: null, is_texte: true}]; break;
        }
      });
    });
  }

  previous(): void {
    if (this.activeRubrique > 0) {
      --this.activeRubrique;
      this.scrollTop();
    }
  }

  next(): void {
    const rubrique = this.quiz.rubriques[this.activeRubrique];
    // Object.keys(this.forms[this.activeRubrique].controls).forEach(key => {
    //   console.log(this.forms[this.activeRubrique].controls[key].errors);
    // });
    if (this.activeRubrique < this.quiz.rubriques.length - 1) {
      if (this.forms[this.activeRubrique].valid) {
        if (rubrique.activate_points_rules) {
          this.activatePointRulesRedirection(rubrique);
        } else {
          ++this.activeRubrique;
        }
        this.scrollTop();
      } else {
        this.showErrors[this.activeRubrique] = true;
        this.jumpToError();
      }
    } else {
      if (this.forms[this.activeRubrique].valid) {
        this.isCorrectionPage = true;
      } else {
        this.showErrors[this.activeRubrique] = true;
        this.jumpToError();
      }
    }
  }

  activatePointRulesRedirection(rubrique: any): void {
    const userPoints = this.getRubricPoints(rubrique);
    let hasRedirect = false;
    rubrique.points_rules.forEach(pointRule => {
      if (userPoints <= pointRule['point_max'] && userPoints >= pointRule['point_min']) {
        this.activeRubrique = pointRule['rubrique_target_poids'] - 1;
        hasRedirect = true;
      }
    });
    if (!hasRedirect) {
      ++this.activeRubrique;
    }
  }

  getRubricPoints(rubrique: any): number {
    let count = 0;
    rubrique.questions.forEach(question => {
      if (question.response_inputs) {
        question.response_inputs.forEach(({value_input, is_texte}) => {
          const responseTarget = question.response_options.find(({slug, points}) => slug === value_input);
          if (responseTarget) {
            count += responseTarget['points'] || 0;
          } else {
            const otherResponseTarget = question.response_options.find(({slug, points}) => slug === 'autres');
            count += otherResponseTarget['points'] || 0;
          }
        });
      }
    });
    return count;
  }

  jumpTo(index: number): void {
    if (index < this.activeRubrique || this.forms[this.activeRubrique].valid) {
      this.activeRubrique = index;
    }
  }

  scrollTop(): void {
    window.scrollTo(0, 0);
  }

  change($event, rubrique): void {
    // console.log(rubrique);
  }

  jumpToError(): void {
    Object.keys(this.forms[this.activeRubrique].controls).forEach(key => {
      if (this.forms[this.activeRubrique].controls[key].errors) {
        const pos = document.getElementById(key).getBoundingClientRect();
        window.scrollTo(pos['x'], pos['y']);
      }
    });
  }

  goToSendForm(event: boolean): void {
    if (event) {
      this.saveQuizResponse();
    } else {
      ++this.activeRubrique;
    }
  }

  saveQuizResponse(): void {
    console.log(this.quiz.rubriques);
  }
}
