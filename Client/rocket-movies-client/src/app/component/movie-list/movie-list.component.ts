import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Movie } from '../../model/movie/movie';
import { MovieService } from '../../service/movie.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {

  public isOpen = false;
  public label: string;
  public movie: Movie;
  public id: number;
  public allMovies: Movie[] = [];

  public searchText: string;

  public isLoggedIn: boolean;
  public currentUserRole: string;

  isFavourites: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private authService: AuthService
  ) {
    document.querySelector('app-nav-menu').setAttribute('style', 'display:block;');
  }

  ngOnInit() {
    document.body.classList.add('movie-list-background');
    this.isFavourites = this.activatedRoute.snapshot.url[0].path === 'favourites';
    this.getMovies();
    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUserRole = this.authService.getUserRole();
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
    } else if (this.isFavourites) {
      this.authService.getFavouriteMovies(parseInt(this.authService.decodedToken.nameid)).subscribe(
        movies => this.allMovies = movies
      );
    } else {
      this.movieService.getMovies().subscribe(
        movies => this.allMovies = movies
      );
      this.router.navigate(['/movies']);
    }
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

  ngOnDestroy() {
    document.body.classList.remove('movie-list-background');
  }

}
