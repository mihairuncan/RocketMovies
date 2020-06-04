import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../model/user/user';

@Injectable()
export class AuthService {

    private registerUrl = "https://localhost:5001/users";
    private loginUrl = "https://localhost:5001/users/authenticate";

    constructor(private http: HttpClient) { }

    registerUser(user: User) {
        return this.http.post<any>(this.registerUrl, user);
    }

    loginUser(user: User) {
        return this.http.post<User>(this.loginUrl, user);
    }

    getToken() {
        return localStorage.getItem('token');
    }
}