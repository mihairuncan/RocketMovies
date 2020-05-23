import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MovieAddComponent } from './component/movie-add/movie-add.component';
import { MoviesComponent } from './component/movie-list/movies.component';
import { MovieUpdateComponent } from './component/movie-update/movie-update.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieAddComponent,
    MovieUpdateComponent
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
