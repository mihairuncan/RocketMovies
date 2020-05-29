import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieAddComponent } from './component/movie-add/movie-add.component';
import { MoviesComponent } from './component/movie-list/movies.component'
import { MovieUpdateComponent } from './component/movie-update/movie-update.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/new', component: MovieAddComponent },
  { path: 'movies/edit', component: MovieUpdateComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
