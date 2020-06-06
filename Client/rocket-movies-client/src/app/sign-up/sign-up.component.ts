import { Component } from '@angular/core';

import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../model/user/user';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  public user: User;
  public errorMessage = [];

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    this.form = this.formBuilder.group({
      id: 0,
      name: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmedPassword: new FormControl('')
    });

  }

  addUser() {
    const pswd = this.form.get('password').value;
    const confPswd = this.form.get('confirmedPassword').value;
    if (pswd === confPswd) {
      this.authService.registerUser(this.form.value).subscribe(data => {
        this.router.navigate(['/login']);
      },
        err => this.errorMessage = err.error.errors);
    } else {
      alert('Passwords are not the same!');
    }
  }

}

