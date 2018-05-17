import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  TemplateRef,
  Inject
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { QuizDto } from '../../../donnee/quiz';
import { QuizReadApplicatifServiceACI } from '../../../service-applicatif/quiz-admin';
import { QuizCudApplicatifServiceACI } from '../../../service-applicatif/quiz-admin';
import { ToastService } from '../../../commun/service/toaster.service';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.scss']
})
export class ListQuizComponent implements OnInit {
  allQuizLength = 210;
  currentPage: number;
  dataSource = new MatTableDataSource();
  enterprises: any;
  idQuizTodelete: number;
  initialPage = 1;
  message: string;
  modalRef: BsModalRef;
  loadingList = false;
  pages = [10, 20, 30, 40];
  searchParams = {
    page: 1,
    numberListPerPage: 10,
    keyWord: null,
    entreprise: null
  };
  searchTerm = new Subject<any>();
  totalItems: number;
  constructor(
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private quizCudApplicatifServiceACI: QuizCudApplicatifServiceACI,
    private quizReadApplicatifServiceACI: QuizReadApplicatifServiceACI
  ) {}

  displayedColumns = [
    'name',
    'description',
    'created_at',
    'entreprise',
    'nb_of_records',
    'is_anonyme',
    'vide'
  ];

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.searchQuiz();
    this.getEntreprises();
    this.searchTerm.next(this.searchParams);
  }

  getEntreprises(): void {
    this.activatedRoute.data.subscribe(data => {
      this.enterprises = data.enterprises;
    });
  }

  deleteQuiz(idQuiz: number): void {
    this.quizCudApplicatifServiceACI
      .deleteQuiz(idQuiz)
      .subscribe(res => {}, err => {});
  }

  openModal(template: TemplateRef<any>, idQuiz: number) {
    this.idQuizTodelete = idQuiz;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
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
    selBox.value = `/copy/${val}`;
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
      this.allQuizLength * 10 / this.searchParams.numberListPerPage;
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
      .debounceTime(500)
      .switchMap(term => {
        this.loadingList = true;
        return this.quizReadApplicatifServiceACI.getQuizs(this.searchParams);
      })
      .subscribe(
        res => this.onSuccessSearch(res),
        err => this.onErrorSearch(err)
      );
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
      this.allQuizLength * 10 / this.searchParams.numberListPerPage;
    this.loadingList = false;
  }
  onErrorSearch(err): void {
    console.log(err);
    this.loadingList = false;
  }

  setPage(page: number): void {
    this.searchParams.page = page;
  }

  changeStatusQuiz(idQuiz: number): void {
    this.quizCudApplicatifServiceACI.changeStatusQuiz(idQuiz).subscribe(
      res => {
        this.toastService.showToast(
          res.message,
          this.toastService.typeToast.success
        );
      },
      err => {}
    );
  }
}
