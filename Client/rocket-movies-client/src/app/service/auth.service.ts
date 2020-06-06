import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../model/user/user';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {

    private baseUrl = environment.apiUrl + '/users';

    jwtHelper = new JwtHelperService();
    decodedToken: any;

    constructor(private http: HttpClient) { }

    registerUser(user: User) {
        return this.http.post<any>(this.baseUrl, user);
    }

    loginUser(user: User) {
        return this.http.post<User>(this.baseUrl + '/authenticate', user);
    }

    getUsers() {
        return this.http.get<User[]>(this.baseUrl);
    }

    isLoggedIn() {
        const token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    }

    decodeToken() {
        this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
        return this.decodedToken;
    }

    getToken() {
        return localStorage.getItem('token');
    }
}
