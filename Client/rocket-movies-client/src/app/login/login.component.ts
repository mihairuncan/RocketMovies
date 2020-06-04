import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {};

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  loginUser() {
    this.authService.loginUser(this.loginUserData).subscribe(
      response => {
        console.log(response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/movies']);
      },
      error => console.log(error)
    );
  }

}
