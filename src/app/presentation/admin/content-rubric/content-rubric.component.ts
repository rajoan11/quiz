import { Component, OnInit, Input } from '@angular/core';

declare const google: any;
declare const gapi: any;
@Component({
  selector: 'app-content-rubric',
  templateUrl: './content-rubric.component.html',
  styleUrls: ['./content-rubric.component.scss']
})
export class ContentRubricComponent implements OnInit {
  @Input() contentQuiz: any;
  @Input() questionQuizs: any;
  developerKey = 'ZMfujAxBWavplSWzmKfm-57i';
  clientId = '274345426144-4pas2h82ls0u3qknse2ucnlrphpar7uf.apps.googleusercontent.com';
  scope = ['https://www.googleapis.com/auth/photos'];
  pickerApiLoaded = false;
  oauthToken?: any;
  constructor() {}

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
            console.log(url);
            if (
              e[google.picker.Response.ACTION] === google.picker.Action.PICKED
            ) {
              const doc = e[google.picker.Response.DOCUMENTS][0];
              url = doc[google.picker.Document.URL];
            }
            const message = 'You picked: ' + url;
            console.log(message);
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
    console.log(url);
    if (data[google.picker.Response.ACTION] === google.picker.Action.PICKED) {
      const doc = data[google.picker.Response.DOCUMENTS][0];
      url = doc[google.picker.Document.URL];
    }
    const message = 'You picked: ' + url;
    alert(message);
  }
}
