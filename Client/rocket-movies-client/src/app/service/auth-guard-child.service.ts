import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardChild implements CanActivate, CanActivateChild {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/movies']);
        return false;
    }

    canActivateChild(): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/movies']);
        return false;
    }

}