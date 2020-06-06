import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/model/user/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  public allUsers: User[] = [];
  public currentUser: User;
  public profileForm: FormGroup;
  private decodedToken: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    this.profileForm = this.formBuilder.group({
      name: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl(''),
    });
    this.decodedToken = this.authService.decodeToken();
    console.log(this.decodedToken);
  }

  getUserById(id: number) {
    this.authService.getUsers().subscribe(
      users => this.allUsers = users
    );
    this.currentUser = this.allUsers.find(user => user.id === id);
    return this.currentUser;
  }

  saveUserData() {

  }

}
