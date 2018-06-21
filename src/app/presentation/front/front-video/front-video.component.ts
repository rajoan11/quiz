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

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit() {}

  ngOnChanges() {
    this.url = this.getUrl(this.content);
  }

  getUrl(fileUrl: any) {
    const idUrl = this.getIdYoutubeVideo(fileUrl);

    return this.domSanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${idUrl}`
    );
  }

  getIdYoutubeVideo(url: any) {
    if (url) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);

      if (match && match[2].length === 11) {
        return match[2];
      } else {
        return 'error';
      }
    }
    return '';
  }
}
