import { Component, Inject} from '@angular/core';

import { FormGroup, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../model/user/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  public user: User;
  public errorMessage = [];

  form: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router) {
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
    let pswd = this.form.get('password').value;
    let confPswd = this.form.get('confirmedPassword').value;
    if (pswd === confPswd) {
      this.http.post<User>('https://localhost:5001/users', this.form.value).subscribe(data => {
        console.log(data);
        this.router.navigate(['/login']);
      },
        err => this.errorMessage = err.error.errors);
    } else {
      alert('Passwords are not the same!');
    }  
   }

}

