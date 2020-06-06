import { Component, OnInit } from '@angular/core';

import { Movie } from '../../model/movie/movie';
import { MovieService } from '../../service/movie.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  public isOpen: boolean = false;
  public label: string;
  public movie: Movie;
  public id: number;
  public allMovies: Movie[] = [];
  public isLoggedIn: boolean;
  public currentUserRole: string;

  constructor(
    private movieService: MovieService,
    private authService: AuthService
  ) {
    document.querySelector('app-nav-menu').setAttribute('style', 'display:block;');
  }

  getMovies() {
    this.movieService.getMovies().subscribe(
      movies => {
        this.allMovies = movies;
      }
    );
  }

  initializeAddMovie() {
    this.isOpen = true;
    this.label = "Add";
    this.movie = new Movie();
  }

  initializeUpdateMovie() {
    this.isOpen = true;
    this.label = "Update";
    this.movie = this.getMovieById(this.id);
  }

  reloadData(action: any) {
    this.id = undefined;
    this.isOpen = false;
    if (action !== "Cancel") {
      this.getMovies();
    }
  }

  getMovieById(id: number) {
    return this.allMovies.find(movie => movie.id == id);
  }

  // Used for Font Awesome icon generation
  constuctEmptyArray(n: number): any[] {
    return Array(Math.round(n));
  }

  ngOnInit() {
    this.getMovies();
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUserRole = this.authService.getUserRole();
  }
}
