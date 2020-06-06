import { Router } from '@angular/router';
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
  public isOpen = false;
  public label: string;
  public movie: Movie;
  public id: number;
  public allMovies: Movie[] = [];

  public searchText: string;


  constructor(
    private router: Router,
    // public isLoggedIn: boolean,
    // public currentUserRole: string,
    private movieService: MovieService,
    private authService: AuthService

  ) {
    document.querySelector('app-nav-menu').setAttribute('style', 'display:block;');
  }

  doSearch() {
    this.router.navigate([], {
      queryParams: { searchText: this.searchText }
    });
    this.getMovies();
  }

  getMovies() {
    if (this.searchText) {
      this.movieService.getFilteredMovies(this.searchText).subscribe(
        result => this.allMovies = result
      );
    } else {
      this.movieService.getMovies().subscribe(
        movies => this.allMovies = movies
      );
      this.router.navigate(['/movies']);
    }
  }

  initializeAddMovie() {
    this.isOpen = true;
    this.label = 'Add';
    this.movie = new Movie();
  }

  initializeUpdateMovie() {
    this.isOpen = true;
    this.label = 'Update';
    this.movie = this.getMovieById(this.id);
  }

  reloadData(action: any) {
    this.id = undefined;
    this.isOpen = false;
    if (action !== 'Cancel') {
      this.getMovies();
    }
  }

  getMovieById(id: number) {
    return this.allMovies.find(movie => movie.id === id);
  }

  // Used for Font Awesome icon generation
  constuctEmptyArray(n: number): any[] {
    return Array(Math.round(n));
  }

  ngOnInit() {
    this.getMovies();
    // this.isLoggedIn = this.authService.isLoggedIn();
    // this.currentUserRole = this.authService.getUserRole();
  }
}
