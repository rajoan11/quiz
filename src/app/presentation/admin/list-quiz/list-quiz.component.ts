import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { PlatformLocation } from '@angular/common';

import { QuizDto } from '../../../donnee/quiz';
import { QuizReadApplicatifServiceACI } from '../../../service-applicatif/quiz-admin';
import { QuizCudApplicatifServiceACI } from '../../../service-applicatif/quiz-admin';
import { ToastService } from '../../../commun/service/toaster.service';
import { EnterpriseService } from '../../../commun/service/enterprise.service';
import { AuthenticationApplicatifServiceACI } from '../../../service-applicatif/authentication';
@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.css']
})
export class ListQuizComponent implements OnInit {
  addClassOnClickEnterprise = false;
  allQuizLength = 210;
  currentPage: number;
  dataSource = new MatTableDataSource();
  enterprises: Array<any>;
  // enterprisesItems: Array<any>;
  // entrepriseSelected: Array<any> = [];
  idQuizToChange: number;
  idQuizTodelete: number;
  initialPage = 1;
  isSuperAdmin = false;
  baseHrefUrl: string;

  matSelected = false;
  message: string;
  modalRef: BsModalRef;
  modalRefChoiceEnterprise: BsModalRef;
  modalRefSelect: BsModalRef;
  loadingList = false;
  pages = [10, 25, 50, 100];
  searchParams = {
    page: 1,
    numberListPerPage: 25,
    keyWord: null,
    entreprise: null,
    orderby: null,
    sort: null
  };
  searchEntrepriseParams: string;
  searchTerm = new Subject<any>();
  // searchTermEntreprise = new Subject<any>();
  selectedSorter: string;
  totalItems: number;
  valueQuizToChange: boolean;
  constructor(
    private router: Router,
    platformLocation: PlatformLocation,
    private authenticationApplicatifServiceACI: AuthenticationApplicatifServiceACI,
    private enterpriseService: EnterpriseService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private quizCudApplicatifServiceACI: QuizCudApplicatifServiceACI,
    private quizReadApplicatifServiceACI: QuizReadApplicatifServiceACI
  ) {
    this.baseHrefUrl = (platformLocation as any).location.href.split(
      '/admin'
    )[0];
  }

  displayedColumns = [
    'name',
    'description',
    'created_at',
    'enterprise_name',
    'nb_of_records',
    'is_anonyme',
    'vide'
  ];

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.searchQuiz();
    this.checkRoles();

    document.documentElement.style.setProperty('--my-var', '#FC6100');
    // this.autcompleteSearchEnterprise();
    this.getEntreprises();
    this.searchTerm.next(this.searchParams);
  }

  getEntreprises(): void {
    this.activatedRoute.data.subscribe(data => {
      this.enterprises = data.enterprises;
    });
  }

  deleteQuiz(idQuiz: number): void {
    this.quizCudApplicatifServiceACI.deleteQuiz(idQuiz).subscribe(
      res => {
        if (res && res.delete) {
          this.toastService.showToast(
            res.message,
            this.toastService.typeToast.success
          );
          this.searchTerm.next(this.searchParams);
        }
      },
      err => {}
    );
  }

  openModal(template: TemplateRef<any>, idQuiz: number) {
    this.idQuizTodelete = idQuiz;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered  modal-sm '
    });
  }

  confirm(idQuiz: number): void {
    this.deleteQuiz(idQuiz);
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  copyMessage(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = `${this.baseHrefUrl}/front/resp/${val}`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  changeNumberPage(): void {
    setTimeout(() => {
      this.setPage(1);
    }, 1);
    this.totalItems =
      (this.allQuizLength * 10) / this.searchParams.numberListPerPage;
    this.searchTerm.next(this.searchParams);
  }

  pageChanged(event: any): void {
    this.searchParams.page = event.page;
    this.searchTerm.next(this.searchParams);
  }
  onChangeName(event: any): void {
    setTimeout(() => {
      this.setPage(1);
    }, 1);
    this.searchTerm.next(this.searchParams);
  }

  changeEnterprise(): void {
    this.addClassOnClickEnterprise = false;
    setTimeout(() => {
      this.setPage(1);
    }, 1);
    this.searchTerm.next(this.searchParams);
  }

  // onChangeEntreprise(event: any): void {
  //   this.searchTermEntreprise.next(event);
  // }

  orderQuizz(type: string, header: string): void {
    this.searchParams.orderby = header;
    this.searchParams.sort = type;
    this.selectedSorter = `${type}_${header}`;
    setTimeout(() => {
      this.setPage(1);
    }, 1);
    this.searchTerm.next(this.searchParams);
  }

  formatDate(date: string): string {
    const dateFormat = date.split('/');
    return `${dateFormat[1]}/${dateFormat[0]}/${dateFormat[2]}`;
  }

  searchQuiz(): void {
    this.searchTerm
      // .distinctUntilChanged()
      .debounceTime(1000)
      .switchMap(term => {
        this.loadingList = true;
        return this.quizReadApplicatifServiceACI.getQuizs(this.searchParams);
      })
      .subscribe(
        res => this.onSuccessSearch(res),
        err => this.onErrorSearch(err)
      );
  }
  checkRoles(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      user &&
      user['role'] &&
      user['role'][0] &&
      (user['role'][0]['rid'] === '10' || user['role'][0]['rid'] === '5')
        ? (this.isSuperAdmin = true)
        : (this.isSuperAdmin = false);
    } else {
      this.activatedRoute.queryParams.subscribe((params: Params) => {
        const token = params['token'];
        if (token) {
          localStorage.setItem('token_quizz', token);
          this.authenticationApplicatifServiceACI
            .login(token)
            .subscribe(res => {
              localStorage.setItem('user', JSON.stringify(res));
              user = JSON.parse(localStorage.getItem('user'));
              user &&
              user['role'] &&
              user['role'][0] &&
              (user['role'][0]['rid'] === '10' ||
                user['role'][0]['rid'] === '5')
                ? (this.isSuperAdmin = true)
                : (this.isSuperAdmin = false);
            });
        }
      });
    }
  }

  onSuccessSearch(res): void {
    this.dataSource = new MatTableDataSource(res.forms);
    this.dataSource.sort = this.sort;
    this.allQuizLength = res.form_count;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'created_at':
          return new Date(item['created_at']).getTime();
        default:
          return item[property];
      }
    };
    this.totalItems =
      (this.allQuizLength * 10) / this.searchParams.numberListPerPage;
    this.loadingList = false;
  }
  onErrorSearch(err): void {
    // console.log(err);
    this.loadingList = false;
  }

  setPage(page: number): void {
    this.searchParams.page = page;
  }

  changeStatusQuiz(
    idQuiz: number,
    template: TemplateRef<any>,
    eventValue: any
  ): void {
    this.openModalChangeSelect(template, idQuiz, eventValue);
  }

  openModalChangeSelect(
    template: TemplateRef<any>,
    idQuiz: number,
    eventValue: any
  ) {
    this.idQuizToChange = idQuiz;
    this.valueQuizToChange = eventValue;
    this.modalRefSelect = this.modalService.show(template, {
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered  modal-sm  '
    });
  }

  openModalChoiceEnterprise(template: TemplateRef<any>) {
    this.modalRefChoiceEnterprise = this.modalService.show(template, {
      backdrop: false,
      ignoreBackdropClick: true
    });
  }

  confirmSelect(idQuiz: number, valueQuiz: boolean): void {
    this.quizCudApplicatifServiceACI.changeStatusQuiz(idQuiz).subscribe(
      res => {
        this.toastService.showToast(
          res.message,
          this.toastService.typeToast.success
        );
      },
      err => {}
    );
    this.message = 'Confirmed!';
    this.modalRefSelect.hide();
  }

  confirmSelectEntreprise(entreprise): void {
    this.enterpriseService.setEnterprise(entreprise);
    this.router.navigate(['/admin/create']);
    this.modalRefChoiceEnterprise.hide();
  }

  declineSelect(valueQuiz: boolean): void {
    this.message = 'Declined!';
    this.modalRefSelect.hide();
    this.dataSource['data'].forEach(data => {
      if (data && data['id'] === this.idQuizToChange) {
        data['is_anonyme'] = !valueQuiz;
      }
    });
  }
}
