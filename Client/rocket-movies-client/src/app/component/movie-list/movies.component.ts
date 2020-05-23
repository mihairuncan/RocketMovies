import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../service/movie.service';
import { Movie } from '../../model/movie/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  public movies: Movie[] = [];

  constructor(
    private movieService: MovieService,
    private router: Router
  ) { }

  getMovies() {
    this.movieService.getMovies().subscribe(
      movies => {
        this.movies = movies; 
      }
    );
  }

  addMovie() {
    this.router.navigate(['movies/new']);
  }

  ngOnInit() {
    this.getMovies();
  }

}
