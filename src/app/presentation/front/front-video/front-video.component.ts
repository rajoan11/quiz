import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-front-video',
  templateUrl: './front-video.component.html',
  styleUrls: ['./front-video.component.css']
})
export class FrontVideoComponent implements OnInit, OnChanges {
  @Input() content: any;
  url: any;

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {}

  ngOnChanges() {
    if (this.content.indexOf('youtube.com') > -1) {
      this.content = this.content.replace('watch?v=', 'embed/');
    }
    this.url = this.content && this.domSanitizer.bypassSecurityTrustResourceUrl(`https://${this.content}`);
  }
}
