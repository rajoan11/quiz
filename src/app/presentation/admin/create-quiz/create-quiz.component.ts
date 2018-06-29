import { Component, OnInit, HostListener, TemplateRef } from '@angular/core';
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
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  autoCloseDropDown = true;
  colorCss = '#FC6100';
  colors: Array<any>;
  enterprises: Array<any>;
  enterprisesItems: Array<any>;
  enterprisesItems1: Array<any>;
  entrepriseSelected: Array<any> = [];
  finishQuizz = false;
  finishQuizzId: number;
  finishQuizzUidQuizz: number;
  hideContentRubric = false;
  isSuperAdmin = false;
  isUpdateQuizz = false;
  modalRefSelect: BsModalRef;
  newQuiz = new QuizDto();
  // rubrics: Array<RubricDo> = [];
  quizzStateAnonyme: boolean;
  savingLoad = false;
  searchTermEntreprise = new Subject<any>();
  searchEntreprise: string;
  typeQuestionDefault = 'Nominatif';
  typeQuestions = [
    { type: 'Nominatif', value: false },
    { type: 'Anonyme', value: true }
  ];
  valueQuizToChange: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private rubriqueService: RubriqueService,
    private quizCudApplicatifService: QuizCudApplicatifServiceACI,
    private quizReadApplicatifService: QuizReadApplicatifServiceACI,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.getColors();
    this.getEntreprises();
    this.autcompleteSearchEnterprise();
    this.checkRoles();
    this.pushDefaultRubrique();
    window.scrollTo(0, 0);
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

  clickedInside($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  clickedOutside($event) {
    this.enterprisesItems = [];
    this.searchEntreprise = ``;
    this.searchTermEntreprise.next();
  }

  getEntreprises(): void {
    this.activatedRoute.data.subscribe(data => {
      if (data && this.route.snapshot.paramMap.get('id')) {
        this.isUpdateQuizz = true;
        this.newQuiz = this.getMetaorQuestion(data.enterprises[0]);
        this.rubriqueService.setRubrique(this.newQuiz.rubriques);

        this.formatEnterprises(data.enterprises[1]);
      } else {
        this.isUpdateQuizz = false;
        this.formatEnterprises(data.enterprises);
        document.documentElement.style.setProperty('--my-var', this.colorCss);
      }
    });
  }

  getMetaorQuestion(quiz: QuizDto): QuizDto {
    quiz.rubriques
      .sort((a, b) => {
        return a.poids - b.poids;
      })
      .forEach((rubric: RubricDto) => {
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
    this.colorCss = quiz.basic_color ? quiz.basic_color : '#FC6100';
    document.documentElement.style.setProperty(
      '--my-var',
      quiz.basic_color ? quiz.basic_color : '#FC6100'
    );

    return quiz;
  }

  formatEnterprises(enterprises): void {
    this.enterprisesItems1 = enterprises.reduce((acc: any, curr) => {
      const a = {
        enterprise_id: curr['nid'],
        enterprise_name: curr['title']
      };
      acc.push(a);
      return acc;
    }, []);
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
    document.documentElement.style.setProperty('--my-var', this.colorCss);

    this.newQuiz.basic_color = this.colorCss.split('#')[1];
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
    this.isUpdateQuizz
      ? (this.newQuiz.id = parseInt(
          this.route.snapshot.paramMap.get('id'),
          null
        ))
      : (this.newQuiz.id = null);

    this.isUpdateQuizz ? this.updateQuizz() : this.createQuizz();
  }

  createQuizz(): void {
    this.quizCudApplicatifService.createQuiz(this.newQuiz).subscribe(
      res => {
        if (res && res.success) {
          this.savingLoad = false;
          this.quizzStateAnonyme = this.newQuiz.is_anonyme;
          this.finishQuizz = true;
          this.finishQuizzId = res.idquizz;
          this.finishQuizzUidQuizz = res.uid_quizz;
        }
      },
      err => {
        this.savingLoad = false;
      }
    );
  }
  updateQuizz(): void {
    this.quizCudApplicatifService.updateQuiz(this.newQuiz).subscribe(
      res => {
        if (res && res.success) {
          this.savingLoad = false;
          this.quizzStateAnonyme = this.newQuiz.is_anonyme;
          this.finishQuizz = true;

          this.finishQuizzId = res.idquizz;
          this.finishQuizzUidQuizz = res.uid_quizz;
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

  deleteRubrique($event): void {
    this.newQuiz.rubriques.forEach((rubric, index) => {
      if (index === $event) {
        this.newQuiz.rubriques.splice(index, 1);
      }
    });
  }

  dropSuccess(): void {
    this.hideContentRubric = true;
  }

  dragRubric(event): void {
    this.hideContentRubric = event;
  }
  out($event): void {
    this.hideContentRubric = false;
  }
  over($event): void {
    this.hideContentRubric = true;
  }

  changeStatusQuiz(template: TemplateRef<any>, eventValue: any): void {
    if (this.isUpdateQuizz) {
      this.openModalChangeSelect(template, eventValue);
    }
  }

  openModalChangeSelect(template: TemplateRef<any>, eventValue: any) {
    this.valueQuizToChange = eventValue;
    this.modalRefSelect = this.modalService.show(template, {
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered  modal-sm  '
    });
  }

  confirmSelect(idQuiz: number, valueQuiz: boolean): void {
    this.modalRefSelect.hide();
  }

  declineSelect(valueQuiz: boolean): void {
    this.modalRefSelect.hide();
    this.newQuiz.is_anonyme = !valueQuiz;
  }
}
