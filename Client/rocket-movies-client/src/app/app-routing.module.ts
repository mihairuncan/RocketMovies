import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieListComponent } from './component/movie-list/movie-list.component';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './component/movie-details/movie-details.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { ApproveCommentsComponent } from './approve-comments/approve-comments.component';
import { AuthGuardChild } from './service/auth-guard-child.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent},
  {
    path: 'commentsToApprove', component: ApproveCommentsComponent,
    data: { roles: ['Admin', 'Moderator'] },
    canActivate: [AuthGuardChild]
  },
  { path: '**', redirectTo: 'movies', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
