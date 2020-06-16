import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { TimeAgoPipe } from 'time-ago-pipe';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MovieDetailsComponent } from './component/movie-details/movie-details.component';
import { MovieListComponent } from './component/movie-list/movie-list.component';
import { MovieUpsertComponent } from './component/movie-upsert/movie-upsert.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AuthService } from './service/auth.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertifyService } from './service/alertify.service';
import { ErrorInterceptorProvider } from './service/error.interceptor';
import { ApproveCommentsComponent } from './approve-comments/approve-comments.component';
import { CommentService } from './service/comment.service';
import { HasRoleDirective } from './_directives/hasRole.directive';
import { AddCommentComponent } from './component/add-comment/add-comment.component';
import { UpdateCommentsComponent } from './component/update-comments/update-comments.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AngularMaterialModule } from './_shared/angular-material.module';

export function tokenGetter() {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MovieDetailsComponent,
    MovieListComponent,
    MovieUpsertComponent,
    AddCommentComponent,
    UpdateCommentsComponent,
    NavMenuComponent,
    SignUpComponent,
    UserProfileComponent,
    ApproveCommentsComponent,
    HasRoleDirective,
    TimeAgoPipe,
    ForgotPasswordComponent

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:5001'],
        blacklistedRoutes: ['localhost:5001/users/authenticate']
      },
    }),
    AngularMaterialModule,
  ],
  exports: [
    AngularMaterialModule
  ],
  entryComponents: [],
  providers: [
    AuthService,
    AlertifyService,
    ErrorInterceptorProvider,
    CommentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
