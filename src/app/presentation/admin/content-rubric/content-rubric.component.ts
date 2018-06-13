import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

declare const google: any;
declare const gapi: any;
@Component({
  selector: 'app-content-rubric',
  templateUrl: './content-rubric.component.html',
  styleUrls: ['./content-rubric.component.css']
})
export class ContentRubricComponent implements OnInit {
  @Input() colorCss: string;
  @Input() contentQuiz: any;
  @Input() index;
  isYoutubeVideo = true;
  @Input() questionQuizs: any;
  developerKey = 'ZMfujAxBWavplSWzmKfm-57i';
  clientId =
    '274345426144-4pas2h82ls0u3qknse2ucnlrphpar7uf.apps.googleusercontent.com';
  scope = ['https://www.googleapis.com/auth/photos'];
  pickerApiLoaded = false;
  oauthToken?: any;
  @Output() deleteIndex: EventEmitter<number> = new EventEmitter<number>();
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  onApiLoad() {
    gapi.load('auth', { callback: this.onAuthApiLoad.bind(this) });
    gapi.load('picker', { callback: this.onPickerApiLoad.bind(this) });
  }

  onAuthApiLoad() {
    gapi.auth.authorize(
      {
        client_id: this.clientId,
        scope: this.scope,
        immediate: false
      },
      this.handleAuthResult
    );
  }

  onPickerApiLoad() {
    this.pickerApiLoaded = true;
    this.createPicker();
  }

  handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
      if (authResult.access_token) {
        const pickerBuilder = new google.picker.PickerBuilder();
        const picker = pickerBuilder
          .enableFeature(google.picker.Feature.NAV_HIDDEN)
          .setOAuthToken(authResult.access_token)
          .addView(google.picker.ViewId.PHOTOS)
          .setDeveloperKey('AIzaSyDFf3LoI2iGoq21Py5mx0YdRZC4-wOu2jQ')
          .setCallback(function(e) {
            let url = 'nothing';
            // console.log(url);
            if (
              e[google.picker.Response.ACTION] === google.picker.Action.PICKED
            ) {
              const doc = e[google.picker.Response.DOCUMENTS][0];
              url = doc[google.picker.Document.URL];
            }
            const message = 'You picked: ' + url;
            // console.log(message);
          })
          .build();
        picker.setVisible(true);
      }
    }
  }

  createPicker() {
    if (this.pickerApiLoaded && this.oauthToken) {
      const picker = new google.picker.PickerBuilder()
        .addView(google.picker.ViewId.DOCUMENTS)
        .setOAuthToken(this.oauthToken)
        .setDeveloperKey(this.developerKey)
        .setCallback(this.pickerCallback)
        .build();
      picker.setVisible(true);
    }
  }

  pickerCallback(data) {
    let url = 'nothing';
    // console.log(url);
    if (data[google.picker.Response.ACTION] === google.picker.Action.PICKED) {
      const doc = data[google.picker.Response.DOCUMENTS][0];
      url = doc[google.picker.Document.URL];
    }
    const message = 'You picked: ' + url;
    alert(message);
  }

  deleteContent(index: number): void {
    this.deleteIndex.emit(index);
  }

  displayImage(url: string) {
    const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    if (base64regex.test(url)) {
      return `data:image/jpeg;base64,${url}`;
    } else {
      return `${url}`;
    }
  }

  onFileChanged(event, contentQuiz) {
    const reader = new FileReader();
    console.log(event.target.files[0]);
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.addEventListener('load', e => {
        const data = {
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        };
        contentQuiz.content = data.value;
      });
    }
  }

  getUrl(fileUrl: any) {
    const idUrl = this.getIdYoutubeVideo(fileUrl);

    return this.sanitizer.bypassSecurityTrustResourceUrl(
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

  isValideYoutubeUrl(url: any, contentQuiz): boolean {
    const p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    url.match(p) ? (contentQuiz.content = url) : (contentQuiz.content = '');

    return url.match(p) ? true : false;
  }

  addYoutubeVideo(event: any, contentQuiz): void {
    // console.log(event);
    this.isYoutubeVideo = this.isValideYoutubeUrl(event, contentQuiz);
  }

  addIframe(event: any, contentQuiz): void {
    console.log(event);
    contentQuiz.content = this.sanitizer.bypassSecurityTrustHtml(event);
  }
}
