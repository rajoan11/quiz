import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  TemplateRef,
  Inject
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { QuizDto } from '../../../donnee/quiz';
import { QuizReadApplicatifServiceACI } from '../../../service-applicatif/quiz-admin';
import { QuizCudApplicatifServiceACI } from '../../../service-applicatif/quiz-admin';

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
    name: null,
    enterprise: null
  };
  searchTerm = new Subject<any>();
  totalItems: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private quizCudApplicatifServiceACI: QuizCudApplicatifServiceACI,
    private quizReadApplicatifServiceACI: QuizReadApplicatifServiceACI
  ) {}

  displayedColumns = [
    'name',
    'description',
    'created_date',
    'entreprise',
    'response',
    'status',
    'vide'
  ];

  @ViewChild(MatSort) sort: MatSort;
  options = [
    { value: 'anonyme', viewValue: 'anonyme' },
    { value: 'nominatif', viewValue: 'nominatif' }
  ];
  selected = 'nominatif';

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
    this.loadingList = true;
    this.searchTerm
      .switchMap(term => {
        return this.quizReadApplicatifServiceACI.getQuizs(this.searchParams);
      })
      .subscribe(
        res => this.onSuccessSearch(res),
        err => this.onErrorSearch(err)
      );
  }

  onSuccessSearch(res): void {
    this.loadingList = false;
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'created_date':
          return new Date(this.formatDate(item['created_date'])).getTime();
        default:
          return item[property];
      }
    };
    this.totalItems =
      this.allQuizLength * 10 / this.searchParams.numberListPerPage;
    this.loadingList = false;
  }
  onErrorSearch(err): void {
    this.loadingList = false;
  }

  setPage(page: number): void {
    this.searchParams.page = page;
  }
}
