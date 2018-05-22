import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthenticationApplicatifServiceACI } from '../../service-applicatif/authentication';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationApplicatifServiceACI: AuthenticationApplicatifServiceACI
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const token = params['token'];
      if (token) {
        localStorage.setItem('token_quizz', token);
        this.authenticationApplicatifServiceACI.login(token).subscribe(res => {
          localStorage.setItem('user', JSON.stringify(res));
        });
      }
    });
  }
}
