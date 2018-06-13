import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-stat',
  templateUrl: './quiz-stat.component.html',
  styleUrls: ['./quiz-stat.component.css']
})
export class QuizStatComponent implements OnInit {
  id = 'chart';
  id1 = 'chart1';
  width = 600;
  height = 400;
  type = 'column2d';
  type2 = 'doughnut2d';
  dataFormat = 'json';
  dataSource;
  constructor() {}

  ngOnInit() {
    this.dataSource = {
      chart: {
        caption: `Harry's SuperMart`,
        subCaption: 'Top 5 stores in last month by revenue',
        numberprefix: '%',
        theme: 'fint'
      },
      data: [
        {
          label: 'Bakersfield Central',
          value: '880000'
        },
        {
          label: 'Garden Groove harbour',
          value: '730000'
        },
        {
          label: 'Los Angeles Topanga',
          value: '590000'
        },
        {
          label: 'Compton-Rancho Dom',
          value: '520000'
        },
        {
          label: 'Daly City Serramonte',
          value: '330000'
        }
      ]
    };
  }
}
