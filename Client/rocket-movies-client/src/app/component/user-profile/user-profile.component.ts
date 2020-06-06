import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from 'src/app/model/user/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  private userId: number;
  public currentUser: User;
  public profileForm: FormGroup;
  private decodedToken: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    this.profileForm = this.formBuilder.group({
      name: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl(''),
    });
  }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.userId = this.authService.decodedToken.nameid;
    this.authService.getUserById(this.userId).subscribe(
      user => {
        this.currentUser = user;
        this.profileForm.patchValue(
          {
            name: this.currentUser.name,
            username: this.currentUser.username,
            email: this.currentUser.email
          }
        );
      }
    );
  }

  saveUserData() {
    this.currentUser = this.profileForm.value;
    this.authService.updateUser(this.userId, this.currentUser).subscribe(
      _ => this.router.navigate(['/movies']),
      error => alert(error)
    );
  }

  goBack() {
    this.router.navigate(['/movies']);
  }

}
