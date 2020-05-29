import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieListComponent } from './component/movie-list/movie-list.component'
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MovieAddComponent } from './component/movie-add/movie-add.component';
import { MovieUpdateComponent } from './component/movie-update/movie-update.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'movies/new', component: MovieAddComponent },
  { path: 'movies/edit', component: MovieUpdateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'movies', component: MovieListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
