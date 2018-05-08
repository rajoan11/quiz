import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { QuizDto } from '../../../donnee/quiz';
import { QuizReadApplicatifServiceACI } from '../../../service-applicatif/quiz-admin';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.css']
})
export class ListQuizComponent implements OnInit, AfterViewInit {
  quizs = new QuizDto();
  dataSource: any;
  constructor(
    private activatedRoute: ActivatedRoute,
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
    this.getQuizs();
  }

  getQuizs(): void {
    this.activatedRoute.data.subscribe(data => {
      this.quizs = data.quizs;
      this.dataSource = new MatTableDataSource(data.quizs);
      console.log(this.quizs);
    });
  }

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
