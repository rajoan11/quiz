import { Component, OnInit, Input } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-front-image',
  templateUrl: './front-image.component.html',
  styleUrls: ['./front-image.component.css']
})
export class FrontImageComponent implements OnInit {
  @Input() content;
  apiUrl: string;

  constructor() {
    this.apiUrl = `${environment.apiUrl}`;
  }

  ngOnInit() {
  }

}
