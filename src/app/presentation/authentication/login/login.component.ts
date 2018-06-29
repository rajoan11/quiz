import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { AuthenticationApplicatifServiceACI } from '../../../service-applicatif/authentication';
import { User } from '../../../donnee/auth/user';
import { ToastService } from '../../../commun/service/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  alert: any;

  user = new User();

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private toastService: ToastService,
    private authenticationApplicatifServiceACI: AuthenticationApplicatifServiceACI
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.authenticationApplicatifServiceACI.loginFront(this.user).subscribe(
      res => {
        if (res.status !== 'ERROR') {
          this.location.back();
          localStorage.setItem('token_quizz', res.token_iframe);
        } else {
          this.alert = {
            type: 'danger',
            msg: res.message && res.message.description
          };
        }
      },
      err => {}
    );
  }
}
