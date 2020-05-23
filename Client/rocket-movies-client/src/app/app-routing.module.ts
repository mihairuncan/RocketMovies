import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieAddComponent } from './component/movie-add/movie-add.component';
import { MoviesComponent } from './component/movie-list/movies.component'
import { MovieUpdateComponent } from './component/movie-update/movie-update.component';

const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: 'movies/new', component: MovieAddComponent },
  { path: 'movies/edit', component: MovieUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
