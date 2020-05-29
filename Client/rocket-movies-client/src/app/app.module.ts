import { HttpClientModule } from '@angular/common/http';
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


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    MovieListComponent,
    MovieUpsertComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
