import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-front-linear-scal',
  templateUrl: './front-linear-scal.component.html',
  styleUrls: ['./front-linear-scal.component.css']
})
export class FrontLinearScalComponent implements OnInit {
  echelle = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor() {}

  ngOnInit() {}
}
