import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MovieUpsertComponent } from './component/movie-upsert/movie-upsert.component';
import { MovieListComponent } from './component/movie-list/movie-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { MovieDetailsComponent } from './component/movie-details/movie-details.component';
<<<<<<< HEAD
import { AuthService } from './service/auth.service';
import { TokenInterceptorService } from './service/token-interceptor.service';
=======
import { SignUpComponent } from './sign-up/sign-up.component';
>>>>>>> 3a39248cc1c5bb64b9d9817b46208f3a5de32bc1


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    MovieListComponent,
    MovieUpsertComponent,
    HomeComponent,
    MovieDetailsComponent,
    SignUpComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [],
  providers: [
    AuthService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
