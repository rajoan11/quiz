import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-front-embed',
  templateUrl: './front-embed.component.html',
  styleUrls: ['./front-embed.component.css']
})
export class FrontEmbedComponent implements OnInit {
  @Input() content: any;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  trustUrl(url) {
    return this.sanitizer.bypassSecurityTrustHtml(url);
  }
}
