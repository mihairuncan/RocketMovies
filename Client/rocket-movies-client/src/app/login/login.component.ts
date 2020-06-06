import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';
import { AlertifyService } from '../service/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  loginUser() {
    this.authService.loginUser(this.loginForm.value).subscribe(
      user => {
        localStorage.setItem('token', user.token);
        // localStorage.setItem('loggedInUser', user.username);
        this.authService.decodeToken();
        this.authService.changeLoggedInUser(user.username);
        this.router.navigate(['/movies']);
        this.alertify.success('Successfully logged in');
      },
      err => this.alertify.error('Invalid username or password')
    );
  }

}
