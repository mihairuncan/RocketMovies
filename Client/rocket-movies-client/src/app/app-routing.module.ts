import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieListComponent } from './component/movie-list/movie-list.component'
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './component/movie-details/movie-details.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'movies/:id', component: MovieDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
