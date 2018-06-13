import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { QuizDto } from '../../../donnee/quiz/quiz-dto';
import { QuizFrontApplicatifServiceACI } from '../../../service-applicatif/quiz-front';

@Component({
  selector: 'app-quizz-response',
  templateUrl: './quizz-response.component.html',
  styleUrls: ['./quizz-response.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QuizzResponseComponent implements OnInit {
  activeRubrique = 0;
  forms = new Array<FormGroup>();
  isCollapsed = true;
  isCollapsed1 = true;
  isCollapsed2 = true;
  isCollapsed3 = true;
  menu: any;
  model: any;
  loadingQuiz = false;
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
    this.quiz.rubriques.forEach(rubrique => {
      const form = this.createFormGroup(rubrique.questions);
      this.forms.push(form);
    });
  }

  createFormGroup(formConfig: any): FormGroup {
    const group = this.fb.group({});
    formConfig.forEach(control => group.addControl('control-' + control.id, this.fb.control('', Validators.required)));
    return group;
  }

  getQuiz(id: string): void {
    this.loadingQuiz = true;
    this.quizFrontService.getQuiz(id).subscribe(
      res => {
        this.loadingQuiz = false;
        this.quiz = res;
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

  next(): void {
    if (this.activeRubrique < this.quiz.rubriques.length - 1) {
      ++this.activeRubrique;
      this.scrollTop();
    }
  }

  previous(): void {
    if (this.activeRubrique > 0) {
      --this.activeRubrique;
      this.scrollTop();
    }
  }

  jumpTo(index: number): void {
    this.activeRubrique = index;
  }

  scrollTop(): void {
    window.scrollTo(0, 0);
  }

}
