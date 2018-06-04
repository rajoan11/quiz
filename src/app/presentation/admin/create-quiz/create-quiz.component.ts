import { Component, OnInit } from '@angular/core';
import { RubricDo, QuizDto, RubricDto } from '../../../donnee/quiz';
import {
  QuizCudApplicatifServiceACI,
  QuizReadApplicatifServiceACI
} from '../../../service-applicatif/quiz-admin';
import { ToastService } from '../../../commun/service/toaster.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EnterpriseService } from '../../../commun/service/enterprise.service';
import { Subject } from 'rxjs/Subject';
import { RubriqueService } from '../../../commun/service/rubrique.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  colorCss = '#FC6100';
  colors: Array<any>;
  enterprises: Array<any>;
  enterprisesItems: Array<any>;
  enterprisesItems1: Array<any>;
  entrepriseSelected: Array<any> = [];
  finishQuizz = false;
  finishQuizzId = false;
  isSuperAdmin = false;
  newQuiz = new QuizDto();
  // rubrics: Array<RubricDo> = [];
  quizzStateAnonyme: boolean;
  savingLoad = false;
  searchTermEntreprise = new Subject<any>();
  typeQuestionDefault = 'Nominatif';
  typeQuestions = [
    { type: 'Nominatif', value: false },
    { type: 'Anonyme', value: true }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private enterpriseService: EnterpriseService,
    private rubriqueService: RubriqueService,
    private quizCudApplicatifService: QuizCudApplicatifServiceACI,
    private quizReadApplicatifService: QuizReadApplicatifServiceACI,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getColors();
    this.getEntreprises();
    this.autcompleteSearchEnterprise();
    this.checkRoles();
    this.pushDefaultRubrique();
  }

  pushDefaultRubrique(): void {
    if (this.newQuiz.rubriques.length === 0) {
      this.newQuiz.rubriques.push(new RubricDto());
      this.rubriqueService.setRubrique(this.newQuiz.rubriques);
    }
  }

  checkRoles(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    user &&
    user['role'] &&
    user['role'][0] &&
    (user['role'][0]['rid'] === '10' || user['role'][0]['rid'] === '5')
      ? (this.isSuperAdmin = true)
      : (this.isSuperAdmin = false);
  }

  getEntreprises(): void {
    this.activatedRoute.data.subscribe(data => {
      this.enterprises = data.enterprises;
      this.enterprisesItems1 = this.enterprises.reduce((acc: any, curr) => {
        const a = {
          enterprise_id: curr['nid'],
          enterprise_name: curr['title']
        };
        acc.push(a);
        return acc;
      }, []);
    });
  }

  getColors(): void {
    this.quizReadApplicatifService.getColors().subscribe(res => {
      this.colors = res;
    });
  }

  transferRubricSuccess($event: any) {
    this.newQuiz.rubriques.push(new RubricDto());
    this.rubriqueService.setRubrique(this.newQuiz.rubriques);
  }

  changeColor(color: string): void {
    this.colorCss = `${color}`;
    this.newQuiz.basic_color = this.colorCss.split('#')[1];
    console.log(color);
    console.log(this.newQuiz.basic_color);
  }

  saveQuiz(): void {
    this.savingLoad = true;
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && !this.isSuperAdmin) {
      const data = {
        enterprise_id: user['entreprise'][0]['entreprise_id'],
        enterprise_name: user['entreprise'][0]['name']
      };
      this.newQuiz.enterprise_forms = [];
      this.newQuiz.enterprise_forms.push(data);
    }
    this.quizCudApplicatifService.createQuiz(this.newQuiz).subscribe(
      res => {
        if (res && res.success) {
          this.savingLoad = false;
          this.quizzStateAnonyme = this.newQuiz.is_anonyme;
          this.newQuiz = new QuizDto();
          this.finishQuizz = true;
          this.finishQuizzId = res.idquizz;
        }
      },
      err => {
        this.savingLoad = false;
      }
    );
  }
  onChangeEntreprise(event: any): void {
    this.searchTermEntreprise.next(event);
  }

  autcompleteSearchEnterprise(): void {
    this.searchTermEntreprise
      .debounceTime(1000)
      .distinctUntilChanged()
      .subscribe(
        res => {
          if (res) {
            this.enterprisesItems = this.enterprisesItems1
              .filter(
                enter =>
                  !this.newQuiz.enterprise_forms.find(
                    enterSelect =>
                      enterSelect.enterprise_id === enter.enterprise_id
                  )
              )
              .filter(enterprise =>
                enterprise['enterprise_name']
                  .toLowerCase()
                  .includes(res.toLowerCase())
              );
          } else {
            this.enterprisesItems = [];
          }
        },
        err => {}
      );
  }
  selectEnterprise(enterprise): void {
    this.newQuiz.enterprise_forms.push(enterprise);
    this.enterprisesItems.forEach((ent, index) => {
      if (ent.enterprise_id === enterprise.enterprise_id) {
        this.enterprisesItems.splice(index, 1);
      }
    });
    // this.getEnterprise();
  }

  deleteSelectEnterprise(enterprise): void {
    this.newQuiz.enterprise_forms.forEach((ent, index) => {
      if (ent.enterprise_id === enterprise.enterprise_id) {
        this.newQuiz.enterprise_forms.splice(index, 1);
      }
    });
    // this.getEnterprise();
  }
}
