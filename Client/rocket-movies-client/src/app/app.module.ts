import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MovieAddComponent } from './component/movie-add/movie-add.component';
import { MoviesComponent } from './component/movie-list/movies.component';
import { MovieUpdateComponent } from './component/movie-update/movie-update.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    MoviesComponent,
    MovieAddComponent,
    MovieUpdateComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    MovieAddComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
