import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';
import { AlertifyService } from '../service/alertify.service';
import { CustomValidators } from '../validators/custom-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService) {
    document.body.className = 'hidescrollbar';
  }

  ngOnInit() {
    this.authService.logout();
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, CustomValidators.patternValidator(/\d/, { hasNumber: true }),
      CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
      CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
      Validators.minLength(8)])]
    });
  }

  loginUser() {

    this.authService.loginUser(this.loginForm.value).subscribe(
      user => {
        localStorage.setItem('token', user.token);
        this.authService.decodeToken();
        this.authService.changeLoggedInUser(user.username);
        this.router.navigate(['/movies']);
        this.alertify.success('Successfully logged in');
      },
      err => this.alertify.error('Invalid username or password')
    );
  }

  ngOnDestroy() {
    document.body.className = '';
  }
}
