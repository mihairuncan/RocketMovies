import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
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
import { TokenInterceptorService } from './service/token-interceptor.service';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MovieDetailsComponent,
    MovieListComponent,
    MovieUpsertComponent,
    NavMenuComponent,
    SignUpComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    AngularFontAwesomeModule,
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
