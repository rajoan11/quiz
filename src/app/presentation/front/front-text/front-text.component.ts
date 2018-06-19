import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-front-text',
  templateUrl: './front-text.component.html',
  styleUrls: ['./front-text.component.css']
})
export class FrontTextComponent implements OnInit {
  @Input() content: any;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  trustUrl(url) {
    return this.sanitizer.bypassSecurityTrustHtml(url);
  }
}
