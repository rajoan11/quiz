import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  TemplateRef,
  Inject
} from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { QuizDto } from '../../../donnee/quiz';
import { QuizReadApplicatifServiceACI } from '../../../service-applicatif/quiz-admin';
import { QuizCudApplicatifServiceACI } from '../../../service-applicatif/quiz-admin';
import { Window } from 'selenium-webdriver';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.css']
})
export class ListQuizComponent implements OnInit {
  currentPage: number;
  initialPage = 1;
  dataSource = new MatTableDataSource();
  idQuizTodelete: number;
  message: string;
  modalRef: BsModalRef;
  loadingList = true;
  allQuizLength = 210;
  pages = [10, 20, 30, 40];
  quizs = new QuizDto();
  selectedPage = 10;
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
    'date',
    'enterprise',
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
    this.getQuizs(1);
  }

  getQuizs(page = 1, enterprise?: string, search?: string): void {
    this.loadingList = true;
    this.quizReadApplicatifServiceACI.getQuizs({}).subscribe(
      res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.totalItems = this.allQuizLength * 10 / this.selectedPage;
        this.loadingList = false;
      },
      err => {}
    );
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
    this.totalItems = this.allQuizLength * 10 / this.selectedPage;
    this.getQuizs(this.currentPage);
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getQuizs(this.currentPage);
  }
}
