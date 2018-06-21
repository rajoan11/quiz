import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
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
  single: any[];
  multi: any[];

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
    domain: ['#fc6100', '#9013fe', '#7ed321', '#C7B42C', '#1280fd', '#f8e71c', '#4a90e2']
  };

  constructor() {
    Object.assign(this, { single });
  }

  ngOnInit() {}

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
}
