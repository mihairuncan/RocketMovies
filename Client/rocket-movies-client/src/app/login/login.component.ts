import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';
import { AlertifyService } from '../service/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public loginForm: FormGroup;
  public submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService) {
    document.body.className = "hidescrollbar";
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      //username is required
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]   
    });
  }

  get f() { return this.loginForm.controls; }

  loginUser() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

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
    document.body.className = "";
  }
}
