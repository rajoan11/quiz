import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizCudApplicatifServiceACI } from '../../../service-applicatif/quiz-admin';
import { ResultatApplicatifServiceACI } from '../../../service-applicatif/resultat';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { QuizStatDto, QuizzPatch } from '../../../donnee/quiz';
import * as html2canvas from 'html2canvas';

const single = [
  {
    name: 'option',
    value: 12
  },
  {
    name: 'option1',
    value: 3
  },
  {
    name: 'option2',
    value: 6
  },
  {
    name: 'option3',
    value: 26
  }
];

@Component({
  selector: 'app-quiz-stat',
  templateUrl: './quiz-stat.component.html',
  styleUrls: ['./quiz-stat.component.css']
})
export class QuizStatComponent implements OnInit {
  loadingStats = false;
  single: any[];
  multi: any[];
  quizPatch = new QuizzPatch();
  quizStats = new QuizStatDto();

  view: any[] = [250, 300];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel = false;
  showLabels = false;
  explodeSlices = false;
  xAxisLabel = 'Country';
  showYAxisLabel = false;
  yAxisLabel = 'Population';
  barPadding = '15';
  yColor = {Tick: 'red'};

  colorScheme = {
    domain: ['#9013fe', '#7ed321', '#f8e71c', '#fc6100', '#4a90e2', '#d0021b', '#4a90e2', '#d0021b']
  };


  constructor(
    private quizService: QuizCudApplicatifServiceACI,
    private resultatService: ResultatApplicatifServiceACI,
    private route: ActivatedRoute
  ) {
    Object.assign(this, { single });
    Object.keys(this.quizPatch).filter(key => key !== 'disabled_response_message').
      forEach(key => this.quizPatch[key] = null);
  }

  ngOnInit() {
    document.documentElement.style.setProperty('--my-var', '#FC6100');
    this.route.params.subscribe(param => this.getQuizstats(param['id']));
  }

  onSelect(event) {
    console.log(event);
  }

  downloadImage(idChart): void {
    html2canvas(document.querySelector('#' + idChart)).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      this.downloadURI(imgData, `${idChart}.png`);
    });
  }

  downloadURI(uri, name) {
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
  }

  getQuizstats(uid: number): void {
    this.loadingStats = true;
    this.resultatService.getQuizStats(uid).subscribe(
      res => {
        this.quizStats = res;
        this.formatQuizPatch();
        this.formatData(this.quizStats);
        this.loadingStats = false;
      },
      err => {
        this.loadingStats = false;
      }
    );
  }

  formatQuizPatch(): void {
    const keysPatch = ['id', 'disabled_response_message', 'accept_reponse'];
    keysPatch.forEach(key => {
      if (this.quizStats.hasOwnProperty(key)) {
        this.quizPatch[key] = this.quizStats[key];
      }
    });
  }

  changeQuizPatch(): void {
    this.quizService.finishQuizz(this.quizPatch).subscribe(
      res => { },
      err => { }
    );
  }

  formatData(quiz: QuizStatDto): void {
    this.quizStats.rubriques.forEach( rubrique => {
      rubrique.questions.forEach(question => {
        if (question.type_question.slug === 'multiple_choice' || question.type_question.slug === 'list_scroll'
          || question.type_question.slug === 'checkbox') {
          this.formatMultipleChoice(question);
        }
        if (question.type_question.slug === 'lineary_scale') {
          this.formatLinearyScale(question);
        }
      });
    });
  }

  formatLinearyScale(question: any): void {
    question.data = question.response_options.map(option => ({...option, value: 0}));
    question.response_options.forEach(option => {
      const optionFound = question.response_inputs.filter(response => +response.value_input === option.poids);
      if (optionFound.length > 0) {
        const data = question.data.find(item => item.slug === option.slug);
        if (data) {
          data.value = optionFound.length;
        }
      }
    });
  }

  formatMultipleChoice(question: any): void {
    question.data = question.response_options.map(option => ({...option, value: 0}));
    question.response_options.forEach(option => {
      if (option.slug === 'autres') {
        const otherOptionsFound = question.response_inputs.filter(response => response.is_text);
        if (otherOptionsFound.length > 0) {
          const data = question.data.find(item => item.slug === 'autres');
          if (data) {
            data.value = otherOptionsFound.length;
          }
        }
      } else {
        const optionFound = question.response_inputs.filter(response => response.value_input === option.slug && !response.is_text);
        if (optionFound.length > 0) {
          const data = question.data.find(item => item.slug === option.slug);
          if (data) {
            data.value = optionFound.length;
          }
        }
      }
    });
    question.data = question.data.filter(data => data.value > 0);
  }
}
